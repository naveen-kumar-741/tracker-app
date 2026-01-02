import type { PropsWithChildren } from 'react';
import type React from 'react';
import { createPortal } from 'react-dom';
import LoadingIcon from '../../assets/loading.svg?react';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import type { ITrackerModalProps } from './modal.interface';
import { typographyVariants } from '../Typography/typo.interface';

const TrackerModal: React.FC<PropsWithChildren<ITrackerModalProps>> = ({
  title,
  children,
  show,
  onClose,
  onSubmit,
  submitLabel = 'ok',
  loading = false,
  overlayClassName = '',
  primaryBtnClassName = '',
  secondaryBtnClassName = '',
}) => {
  if (!show) return null;
  return createPortal(
    <aside
      className="fixed top-0 left-0 h-dvh w-screen bg-(--bg-dark-10) z-50 backdrop-blur-[1px] flex"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`relative m-auto w-[calc(100vw-32px)] max-w-150 h-85 max-h-[calc(100vh-32px)] bg-(--light) rounded-sm flex flex-col px-3 sm:px-5 sm:py-4 py-2.5 sm:gap-4 gap-3 overflow-auto ${overlayClassName}`}
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-(--primary) bg-(--bg-dark-05) backdrop-blur-[1px]">
            <LoadingIcon className="w-8 h-8" />
          </div>
        )}
        <header className="w-full sticky top-0 bg-(--light) py-1">
          <Typography
            label={title}
            variant={typographyVariants.sub_heading_18_600}
          />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="w-full flex justify-end gap-2 sticky bottom-0 bg-(--light) py-1">
          <Button
            label="Cancel"
            className={`bg-transparent border border-(--primary) text-(--primary)! ${secondaryBtnClassName}`}
            onClick={onClose}
            type="button"
          />
          <Button
            label={submitLabel}
            onClick={onSubmit}
            className={`border border-(--primary) ${primaryBtnClassName}`}
            type="submit"
          />
        </footer>
      </section>
    </aside>,
    document.body
  );
};

export default TrackerModal;
