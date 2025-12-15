import type { INodeRendererProps } from 'react-accessible-treeview';
import type { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';
import DownArrow from '../../assets/down_arrow.svg?react';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import Timer from './Timer';

const Event = ({
  element,
  getNodeProps,
  isExpanded,
  isBranch,
  level,
}: INodeRendererProps<IFlatMetadata>) => {
  return (
    <div
      {...getNodeProps()}
      style={{ paddingLeft: 20 * (level - 1) }}
      className={`min-w-75 ${isBranch ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="py-1 px-2 bg-(--primary-05) mb-1 rounded-xs flex gap-1 items-center ">
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
      </div>
    </div>
  );
};

export default Event;
