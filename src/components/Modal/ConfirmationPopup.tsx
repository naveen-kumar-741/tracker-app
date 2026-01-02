import type React from 'react';
import TrackerModal from './TrackerModal';
import type { IConfirmationPopupProps } from './modal.interface';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';
import WarningIcon from '../../assets/warning_icon.svg?react';

const ConfirmationPopup: React.FC<IConfirmationPopupProps> = ({
  show,
  onClose,
  onConfirm,
  title,
  warningMsg = '',
  confirmMsg = '',
  loading = false,
}) => {
  return (
    <TrackerModal
      show={show}
      onClose={onClose}
      onSubmit={onConfirm}
      title={title}
      submitLabel="Delete"
      overlayClassName="sm:h-50! h-45!"
      primaryBtnClassName="bg-red-500 border-red-500"
      secondaryBtnClassName="border-red-500 text-red-500!"
      loading={loading}
    >
      <div className="flex flex-col gap-2">
        {warningMsg && (
          <div className="w-full bg-amber-400 flex items-center p-0.5 gap-2 rounded-xs">
            <WarningIcon className="w-5 h-5" />
            <Typography
              label={warningMsg}
              variant={typographyVariants.caption_12_500}
              className="text-white"
            />
          </div>
        )}
        <Typography
          label={confirmMsg}
          variant={typographyVariants.body_14_500}
        />
      </div>
    </TrackerModal>
  );
};

export default ConfirmationPopup;
