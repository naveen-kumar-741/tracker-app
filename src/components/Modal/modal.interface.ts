import type { NodeId } from 'react-accessible-treeview';

export interface ITrackerModalProps extends IModalProps {
  title: string;
  submitLabel?: string;
  onSubmit: () => void;
  loading?: boolean;
  primaryBtnClassName?: string;
  secondaryBtnClassName?: string;
  overlayClassName?: string;
}

export interface IModalProps {
  onClose: () => void;
  show: boolean;
}

export interface ICreateOrEditEventModalProps extends IModalProps {
  eventId?: NodeId;
}

export interface IConfirmationPopupProps extends IModalProps {
  onConfirm: () => void;
  title: string;
  warningMsg?: string;
  confirmMsg: string;
  loading?: boolean;
}
