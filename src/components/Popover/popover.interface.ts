export interface IPopoverProps {
  popup: React.FC<IPopupProps>;
  position: PositionType;
}

export interface IPopupProps {
  onClose: () => void;
}

export type PositionType =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'right';
