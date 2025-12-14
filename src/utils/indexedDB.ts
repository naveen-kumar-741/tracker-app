import Dexie from 'dexie';
import type { INode } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import type { ITag } from '../components/Event/event.interface';

// export interface UserData {
//   firstName: string;
//   lastName: string;
//   age: number | string;
//   email: string;
//   gender: string;
// }

export const db = new Dexie('trackerDB');
db.version(1).stores({
  events: '++id, name, parent, children, metadata',
  tags: '++id, name',
});

export const addEvent = async (event: INode<IFlatMetadata>) => {
  await db.table('events').add(event);
};

export const getAllEvents = async () => {
  const user = await db.table('events').toArray();
  return user;
};

export const bulkAddTags = async (event: ITag[]) => {
  await db.table('tags').bulkAdd(event);
};

// export const updateData = async (id: number, data: UserData) => {
//   await db.table('users').update(id, data);
//   console.log(`User ${id} updated to:`, data);
// };

// export const deleteData = async (id: number) => {
//   await db.table('users').delete(id);
//   console.log(`User ${id} deleted`);
// };
