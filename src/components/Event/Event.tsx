import type { INodeRendererProps } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import DownArrow from '../../assets/down_arrow.svg?react';
import Menu from '../../assets/menu.svg?react';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import Timer from './Timer';
import Popover from '../Popover/Popover';
import EventAction from './EventAction';
import type { MenuOption } from '../Menu/menu.interface';
import { useState } from 'react';
import CreateOrEditEventModal from '../Modal/CreateOrEditEventModal';

const Event = ({
  element,
  getNodeProps,
  isExpanded,
  isBranch,
  level,
}: INodeRendererProps<IFlatMetadata>) => {
  const [showModal, setShowModal] = useState<string>('');

  const onSelect = (option: MenuOption) => {
    setShowModal(option.label);
  };

  const handleClose = () => {
    setShowModal('');
  };

  return (
    <div
      {...getNodeProps()}
      style={{ paddingLeft: 20 * (level - 1) }}
      className={`min-w-75 ${isBranch ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="py-1 px-3 bg-(--primary-05) mb-1 rounded-xs flex gap-1 items-center min-h-10">
        {isBranch && (
          <DownArrow
            className={`h-5 w-5 transition-all ${
              !isExpanded ? '-rotate-90' : ''
            }`}
          />
        )}
        <Typography
          label={element.name}
          variant={typographyVariants.body_16_500}
          className="flex-1"
        />
        {element?.metadata?.startTime && element?.metadata?.endTime && (
          <Timer
            startTime={String(element?.metadata?.startTime)}
            endTime={String(element?.metadata?.endTime)}
          />
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Popover
            popup={(props) => (
              <EventAction
                eventId={element.id}
                onSelect={onSelect}
                {...props}
              />
            )}
            position="bottom-end"
          >
            <Menu className="cursor-pointer ml-1" />
          </Popover>
        </div>
      </div>

      <CreateOrEditEventModal
        onClose={handleClose}
        show={showModal === 'Edit'}
        eventId={element.id}
      />
    </div>
  );
};

export default Event;
