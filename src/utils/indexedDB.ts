import Dexie from 'dexie';
import type {
  IEventType,
  IEventTypePayload,
  ITagPayload,
} from '../components/Event/event.interface';

// export interface UserData {
//   firstName: string;
//   lastName: string;
//   age: number | string;
//   email: string;
//   gender: string;
// }

export const db = new Dexie('trackerDB');
db.version(1).stores({
  events: '++id, name, parent, children, metadata, tagId',
  tags: '++id, name',
});

export const addEvent = async (event: IEventTypePayload) => {
  debugger;
  const addedEventId = await db.table('events').add(event);

  if (event.parent) {
    const parent = await db.table('events').get(event.parent);
    parent.children = [...parent.children, addedEventId];
    updateEvent(parent.id, parent);
  }
};

export const getAllEvents = async () => {
  const user = await db.table('events').toArray();
  return user;
};

export const bulkAddTags = async (event: ITagPayload[]) => {
  await db.table('tags').bulkAdd(event);
};

export const updateEvent = async (id: number, data: IEventType) => {
  await db.table('events').update(id, data);
};

// export const deleteData = async (id: number) => {
//   await db.table('users').delete(id);
//   console.log(`User ${id} deleted`);
// };
