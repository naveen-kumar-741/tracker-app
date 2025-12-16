import type React from 'react';
import TrackerModal from './TrackerModal';
import type { IModalProps } from './modal.interface';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EventSchema, type EventFormValues } from '../../utils/form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField/InputField';
import DatePicker from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import TrackerDropDown from '../DropDown/DropDown';
import { useLiveQuery } from 'dexie-react-hooks';
import type { ITag } from '../Event/event.interface';
import { addEvent, db } from '../../utils/indexedDB';
import type { INode } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';

const CreateEventModal: React.FC<IModalProps> = ({ show, onClose }) => {
  const tags = useLiveQuery<ITag[]>(() => db.table('tags').toArray(), []);
  const events = useLiveQuery<INode<IFlatMetadata>[]>(
    () => db.table('events').toArray(),
    []
  );
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
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

  const handleCreateEvent = async (data: EventFormValues) => {
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
    onClose();
  };

  return (
    <TrackerModal
      show={show}
      onClose={onClose}
      onSubmit={() => handleSubmit(handleCreateEvent)()}
      title={'Create a New Event'}
      submitLabel="Create"
      loading={isSubmitting}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleCreateEvent)}
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
              />
            );
          }}
        />
        <Controller
          name="startTime"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Start Time"
              wrapperClassName="w-1/2"
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
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              label="End Time"
              wrapperClassName="w-1/2"
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
          )}
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
              />
            );
          }}
        />
      </form>
    </TrackerModal>
  );
};

export default CreateEventModal;
