import type React from 'react';
import TreeView, { type INode } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import { useLiveQuery } from 'dexie-react-hooks';
import Event from '../components/Event/Event';
import Button from '../components/Button/Button';
import AddIcon from '../assets/add_icon.svg?react';
import NoEventIcon from '../assets/no_event_icon.svg?react';
import EventHeader from '../components/Event/EventHeader';
import Typography from '../components/Typography/Typography';
import CreateOrEditEventModal from '../components/Modal/CreateOrEditEventModal';
import { db } from '../utils/indexedDB';
import { useContext, useMemo, useState } from 'react';
import { typographyVariants } from '../components/Typography/typo.interface';
import { AppContext } from '../providers/AppProvider';

const EventsPage: React.FC = () => {
  const { selectedTag } = useContext(AppContext);

  const events = useLiveQuery<INode<IFlatMetadata>[]>(
    () =>
      db
        .table('events')
        .where(`tagId`)
        .equals(selectedTag?.id ?? '')
        .toArray(),
    [selectedTag]
  );
  const [show, setShow] = useState<boolean>(false);

  const formattedData = useMemo(() => {
    if (!events) return [];
    const eventIds = events
      ?.filter((event) => event.parent === 0)
      ?.map((event) => event.id);
    return [
      { name: 'parent', children: eventIds, id: 0, parent: null },
      ...events,
    ];
  }, [events]);

  return (
    <section className="flex flex-col w-full">
      <EventHeader hideAction={!(formattedData?.length > 1)} />
      {formattedData?.length > 1 ? (
        <TreeView
          data={formattedData}
          multiSelect
          className="p-2.5"
          nodeRenderer={Event}
        />
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <NoEventIcon className="h-18 w-18" />
            <Typography
              label={`No ${selectedTag?.name ?? ''} events yet`}
              variant={typographyVariants.sub_heading_18_500}
              className="text-(--primary-75)"
            />
            <Button
              label="New Events"
              icon={<AddIcon className="w-5 h-5 text-white" />}
              onClick={() => setShow(true)}
            />
          </div>
        </div>
      )}
      <CreateOrEditEventModal show={show} onClose={() => setShow(false)} />
    </section>
  );
};

export default EventsPage;
