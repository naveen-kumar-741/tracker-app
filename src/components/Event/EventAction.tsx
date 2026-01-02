import type React from 'react';
import type { MenuOption } from '../Menu/menu.interface';
import type { IEventActionProps } from './event.interface';
import TrackerMenu from '../Menu/TrackerMenu';
import EditIcon from '../../assets/edit_icon.svg?react';
import DeleteIcon from '../../assets/delete_icon.svg?react';
import AddNotesIcon from '../../assets/add_notes.svg?react';

const EventAction: React.FC<IEventActionProps> = ({ onClose, onSelect }) => {
  const menuOptions: MenuOption[] = [
    {
      label: 'Edit',
      icon: EditIcon,
    },
    {
      label: 'Add Notes',
      icon: AddNotesIcon,
    },
    {
      label: 'Delete',
      icon: DeleteIcon,
      color: 'red-500',
    },
  ];

  const handleSelect = (option: MenuOption) => {
    onSelect(option);
    onClose();
  };

  return <TrackerMenu menuOptions={menuOptions} onSelect={handleSelect} />;
};

export default EventAction;
