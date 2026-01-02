import type React from 'react';
import TrackerModal from './TrackerModal';
import type { ICreateOrEditEventModalProps } from './modal.interface';
import { useEffect, useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { EventSchema, type EventFormValues } from '../../utils/form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField/InputField';
import TackerDatePicker from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import TrackerDropDown from '../DropDown/DropDown';
import { useLiveQuery } from 'dexie-react-hooks';
import type { IEventType, ITag } from '../Event/event.interface';
import { addEvent, db, updateEvent } from '../../utils/indexedDB';

const CreateOrEditEventModal: React.FC<ICreateOrEditEventModalProps> = ({
  show,
  onClose,
  eventId,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm<EventFormValues>({
    resolver: zodResolver(EventSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      startTime: '',
      endTime: '',
      parent: 0,
    },
  });

  const startTime = useWatch({
    control,
    name: 'startTime',
  });
  const endTime = useWatch({
    control,
    name: 'endTime',
  });
  const tagId = useWatch({
    control,
    name: 'tagId',
  });

  const tags = useLiveQuery<ITag[]>(() => db.table('tags').toArray(), []);
  const events = useLiveQuery<IEventType[]>(
    () =>
      db
        .table('events')
        .where(`tagId`)
        .equals(tagId ?? '')
        .toArray(),
    [tagId]
  );

  const eventData = useLiveQuery<IEventType | undefined>(
    () => (eventId ? db.table('events').get(eventId) : undefined),
    [eventId]
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  const createOrUpdateEvent = async (data: EventFormValues) => {
    if (eventId) {
      await updateEvent(Number(eventId), {
        id: Number(eventId),
        name: data.name,
        children: eventData?.children ?? [],
        parent: data.parent,
        tagId: data.tagId,
        metadata: {
          startTime: data.startTime,
          endTime: data.endTime,
        },
      });
    } else {
      await addEvent({
        name: data.name,
        children: [],
        parent: data.parent,
        tagId: data.tagId,
        metadata: {
          startTime: data.startTime,
          endTime: data.endTime,
        },
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (startTime && endTime && dayjs(endTime).isBefore(startTime)) {
      setValue('endTime', startTime);
    }
  }, [startTime]);

  useEffect(() => {
    if (eventData) {
      setValue('endTime', eventData?.metadata?.endTime);
      setValue('name', eventData.name);
      setValue('parent', eventData.parent);
      setValue('startTime', eventData?.metadata?.startTime);
      setValue('tagId', eventData.tagId);
    }
  }, [eventData]);

  return (
    <TrackerModal
      show={show}
      onClose={handleClose}
      onSubmit={() => handleSubmit(createOrUpdateEvent)()}
      title={`${eventId ? 'Update' : 'Create'} Event`}
      submitLabel={eventId ? 'Update' : 'Create'}
      loading={isSubmitting}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit(createOrUpdateEvent)}
        className="flex flex-wrap"
      >
        <InputField
          id="name"
          wrapperClassName="w-1/2"
          placeholder="Enter Event Name"
          label="Event Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Controller
          name="tagId"
          control={control}
          render={({ field, fieldState }) => {
            const options = (tags ?? [])?.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }));
            return (
              <TrackerDropDown
                label="Tag"
                options={options}
                value={options.find((o) => o.value === field.value) ?? null}
                onChange={field.onChange}
                error={fieldState?.error?.message}
                wrapperClassName="w-1/2"
                isDisabled={!!eventId}
              />
            );
          }}
        />
        <Controller
          name="startTime"
          control={control}
          render={({ field, fieldState }) => (
            <TackerDatePicker
              label="Start Time"
              wrapperClassName="w-1/2"
              value={field.value ? new Date(field.value) : null}
              minDate={new Date()}
              minTime={
                !field.value || dayjs(field.value).isSame(dayjs(), 'day')
                  ? new Date()
                  : dayjs().startOf('day').toDate()
              }
              maxTime={dayjs().endOf('day').toDate()}
              onChange={(date) => {
                if (!date) {
                  field.onChange('');
                  return;
                }

                field.onChange(
                  dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
                );
              }}
              error={fieldState?.error?.message}
            />
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field, fieldState }) => {
            const start = startTime ? new Date(startTime) : null;
            return (
              <TackerDatePicker
                label="End Time"
                wrapperClassName="w-1/2"
                minDate={start ?? new Date()}
                minTime={
                  start && dayjs(field.value).isSame(start, 'day')
                    ? start
                    : dayjs().startOf('day').toDate()
                }
                maxTime={dayjs().endOf('day').toDate()}
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  if (!date) {
                    field.onChange('');
                    return;
                  }

                  field.onChange(
                    dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
                  );
                }}
                error={fieldState?.error?.message}
              />
            );
          }}
        />
        <Controller
          name="parent"
          control={control}
          render={({ field, fieldState }) => {
            const options = (events ?? [])?.map((tag) => ({
              label: tag.name,
              value: Number(tag.id),
            }));
            return (
              <TrackerDropDown
                label="Parent"
                options={options}
                value={options.find((o) => o.value === field.value) ?? null}
                onChange={field.onChange}
                error={fieldState?.error?.message}
                wrapperClassName="w-1/2"
                isClearable={true}
                isDisabled={!tagId || !!eventId}
              />
            );
          }}
        />
      </form>
    </TrackerModal>
  );
};

export default CreateOrEditEventModal;
