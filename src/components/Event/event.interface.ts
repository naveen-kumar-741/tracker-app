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
  metadata: { startTime: string; endTime: string };
}

export interface IEventType extends IEventTypePayload {
  id: number;
}
