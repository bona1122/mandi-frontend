import { useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';

import classNames from 'classnames/bind';

import styles from './index.module.scss';

const baseSnapPoints = [-118, 0.35, 0];
const baseInitialSnap = 1;

interface DraggableBottomSheetProps {
  isOpen: boolean;
  disableDrag?: boolean;
  hasHeader?: boolean;
  snapPoints?: number[];
  initialSnap?: number;
  contentHeight?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);
const BLOCK = 'draggable-bottom-sheet';

const DraggableBottomSheet = ({
  isOpen,
  snapPoints = baseSnapPoints,
  initialSnap = baseInitialSnap,
  disableDrag,
  hasHeader = true,
  contentHeight = false,
  onClose,
  children,
}: DraggableBottomSheetProps) => {
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isOpen]);
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      disableDrag={disableDrag}
      detent={contentHeight ? 'content-height' : 'full-height'}
      className={cx(BLOCK)}
    >
      <Sheet.Container className={cx(`${BLOCK}__container`)}>
        {hasHeader && <Sheet.Header />}
        <Sheet.Content>
          <Sheet.Scroller draggableAt='both'>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default DraggableBottomSheet;
