import type React from 'react';
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import type { IPopoverProps } from './popover.interface';
import { getRightPos, getTopPos } from '../../utils/helper';

const Popover: React.FC<PropsWithChildren<IPopoverProps>> = ({
  children,
  popup: PopUpComponent,
  position,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>();

  const showPopover = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const anchorRect = anchorRef.current?.getBoundingClientRect();
    const popoverRect = popoverRef.current?.getBoundingClientRect();
    if (popoverRef.current && anchorRect && popoverRect) {
      const topPos = getTopPos(anchorRect, popoverRect, position);
      const rightPos = getRightPos(anchorRect, popoverRect, position);

      popoverRef.current.style.top = `${topPos}px`;
      popoverRef.current.style.right = `${rightPos}px`;
      popoverRef.current.style.marginTop = '8px';
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverRef.current, anchorRef.current]);

  return (
    <>
      <div ref={anchorRef} onMouseDown={showPopover}>
        {children}
      </div>
      {show &&
        createPortal(
          <div ref={popoverRef} className="w-fit fixed z-50">
            <PopUpComponent onClose={handleClose} />
          </div>,
          document.body
        )}
    </>
  );
};

export default Popover;
