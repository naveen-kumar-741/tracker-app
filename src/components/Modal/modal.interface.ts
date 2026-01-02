import type { NodeId } from 'react-accessible-treeview';

export interface ITrackerModalProps extends IModalProps {
  title: string;
  submitLabel?: string;
  onSubmit: () => void;
  loading?: boolean;
}

export interface IModalProps {
  onClose: () => void;
  show: boolean;
}

export interface ICreateOrEditEventModalProps extends IModalProps {
  eventId?: NodeId;
}
