import React, {ReactNode} from 'react';

import {
  Description,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './dialog.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'dialog';

interface DialogProps {
  /**
   * 모달 열림 여부
   */
  isOpen: boolean;
  /**
   * 모달 제목
   */
  title: string;
  /**
   * 모달 설명
   */
  description?: string;
  /**
   * 모달 버튼
   */
  buttons: ReactNode;
  /**
   * 모달 닫기 함수
   */
  onClose: () => void;
}

/**
 * 모달 컴포넌트
 */
const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  buttons,
}: DialogProps) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <DialogBackdrop className={cn(`${BLOCK}__backdrop`)} />
      <div className={cn(`${BLOCK}__container`)}>
        <DialogPanel className={cn(`${BLOCK}__panel`)}>
          <div className={cn(`${BLOCK}__panel__content`)}>
            <DialogTitle className={cn(`${BLOCK}__panel__title`)}>
              {title}
            </DialogTitle>
            <Description className={cn(`${BLOCK}__panel__description`)}>
              {description}
            </Description>
          </div>
          {buttons}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;