import type { NodeId } from 'react-accessible-treeview';
import type { MenuOption } from '../Menu/menu.interface';

export interface ITimerProps {
  startTime: string;
  endTime: string;
}

export interface ITagPayload {
  name: string;
}
export interface ITag extends ITagPayload {
  id: number;
}

export interface IEventTypePayload {
  name: string;
  children: never[];
  parent: number;
  tagId: number;
  metadata: { startTime: string; endTime: string };
}

export interface IEventType extends IEventTypePayload {
  id: number;
}

export interface IEventActionProps {
  eventId: NodeId;
  onClose: () => void;
  onSelect: (option: MenuOption) => void;
}
