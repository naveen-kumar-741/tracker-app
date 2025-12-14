import type React from 'react';
import TreeView, { type INode } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import Event from '../components/Event/Event';
import CountDown from '../components/CountDown/CountDown';
import dayjs from 'dayjs';
import EventHeader from '../components/Event/EventHeader';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../utils/indexedDB';
import { useMemo } from 'react';

const EventsPage: React.FC = () => {
  const data: INode<IFlatMetadata>[] = [
    { name: 'parent', children: [1, 4, 9, 10, 11], id: 0, parent: null },
    {
      name: 'Event 1',
      children: [2, 3],
      id: 1,
      parent: 0,
      metadata: {
        startTime: '2025-12-12T00:30:00Z',
        endTime: '2025-12-12T10:30:00Z',
      },
    },
    { name: 'Event 2', id: 2, parent: 1, children: [] },
    { name: 'Event 3', id: 3, parent: 1, children: [] },
    { name: 'Event 4', children: [5, 7], id: 4, parent: 0 },
    { name: 'Event 5', children: [6], id: 5, parent: 4 },
    { name: 'Event 6', id: 6, parent: 5, children: [] },
    { name: 'Event 7', children: [8], id: 7, parent: 4 },
    { name: 'Event 8', id: 8, parent: 7, children: [] },
    { name: 'Event 9', id: 9, parent: 0, children: [] },
    { name: 'Event 10', id: 10, parent: 0, children: [] },
    { name: 'Event 11', id: 11, parent: 0, children: [] },
  ];
  const events = useLiveQuery<INode<IFlatMetadata>[]>(
    () => db.table('events').toArray(),
    []
  );

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

  console.log('events', events);

  return (
    <section className="flex flex-col w-full">
      <EventHeader />
      {formattedData?.length > 0 && (
        <TreeView
          data={formattedData}
          multiSelect
          className="p-2.5"
          nodeRenderer={Event}
        />
      )}
    </section>
  );
};

export default EventsPage;
