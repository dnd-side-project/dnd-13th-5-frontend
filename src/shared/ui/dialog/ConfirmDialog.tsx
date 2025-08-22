import type { ReactNode } from 'react';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/dialog/Dialog';

interface ConfirmDialogProps {
  title: string;
  body: string | ReactNode;
  closeName?: string;
  confirmName?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleConfirm: () => void;
}

export const ConfirmDialog = ({
  title,
  body,
  closeName = '취소',
  confirmName = '확인',
  isOpen,
  setIsOpen,
  handleConfirm,
}: ConfirmDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay>
        <DialogContent
          size="sm"
          className="max-w-sm bg-white text-center px-0 pb-0 text-gray-800  border border-gray-100"
        >
          <DialogHeader>
            <DialogTitle className="typo-body-m-bold">{title}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="bg-white typo-body-m-medium px-5 mb-5">{body}</div>
          </DialogBody>

          <DialogActions align="center" className="flex border-t border-gray-100">
            <DialogClose asChild>
              <button type="button" className="rounded-xl w-full typo-body-m-medium p-5">
                {closeName}
              </button>
            </DialogClose>
            <div className="h-full w-px border border-gray-100" />
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-xl text-primary-700 w-full typo-body-m-medium p-5"
            >
              {confirmName}
            </button>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
