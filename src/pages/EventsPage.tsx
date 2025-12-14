import type React from 'react';
import TreeView, { type INode } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import Event from '../components/Event/Event';
import CountDown from '../components/CountDown/CountDown';
import dayjs from 'dayjs';
import EventHeader from '../components/Event/EventHeader';

const EventsPage: React.FC = () => {
  const data: INode<IFlatMetadata>[] = [
    { name: 'short term', children: [1, 4, 9, 10, 11], id: 0, parent: null },
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
  return (
    <section className="flex flex-col w-full">
      <EventHeader />
      <TreeView
        data={data}
        multiSelect
        className="p-2.5"
        nodeRenderer={Event}
      />

      <CountDown
        dateTime={dayjs('2023-12-14 17:30:00')
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss[Z]')}
        pausedTimes={[
          {
            start: '2024-06-01 10:00:00',
            // end: '2024-06-10 18:00:00',
          },
        ]}
      />
    </section>
  );
};

export default EventsPage;
