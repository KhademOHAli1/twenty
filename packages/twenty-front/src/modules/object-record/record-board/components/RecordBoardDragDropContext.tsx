import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { recordBoardSelectedRecordIdsComponentSelector } from '@/object-record/record-board/states/selectors/recordBoardSelectedRecordIdsComponentSelector';
import { useEndRecordDrag } from '@/object-record/record-drag/hooks/useEndRecordDrag';
import { useProcessBoardCardDrop } from '@/object-record/record-drag/hooks/useProcessBoardCardDrop';
import { useStartCardDrag } from '@/object-record/record-drag/hooks/useStartRecordDrag';
import { originalSelectionComponentState } from '@/object-record/record-drag/states/originalSelectionComponentState';

import { RECORD_INDEX_REMOVE_SORTING_MODAL_ID } from '@/object-record/record-index/constants/RecordIndexRemoveSortingModalId';
import { currentRecordSortsComponentState } from '@/object-record/record-sort/states/currentRecordSortsComponentState';
import { useModal } from '@/ui/layout/modal/hooks/useModal';
import { useRecoilComponentCallbackState } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackState';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import {
  DragDropContext,
  type DragStart,
  type OnDragEndResponder,
} from '@hello-pangea/dnd';
import { useContext } from 'react';
import { useRecoilCallback } from 'recoil';

export const RecordBoardDragDropContext = ({
  children,
}: React.PropsWithChildren) => {
  console.log('RecordBoardDragDropContext');
  const { recordBoardId } = useContext(RecordBoardContext);

  const currentRecordSortCallbackState = useRecoilComponentCallbackState(
    currentRecordSortsComponentState,
  );

  const recordBoardSelectedRecordIdsSelector = useRecoilComponentCallbackState(
    recordBoardSelectedRecordIdsComponentSelector,
    recordBoardId,
  );

  const originalSelectionCallbackState = useRecoilComponentCallbackState(
    originalSelectionComponentState,
  );

  const { startCardDrag } = useStartCardDrag(recordBoardId);
  const { endDrag } = useEndRecordDrag('board', recordBoardId);
  // const multiDragState = useRecordDragState('board', recordBoardId);

  const { processBoardCardDrop: processDragOperation } =
    useProcessBoardCardDrop();

  const { openModal } = useModal();

  const handleDragStart = useRecoilCallback(
    ({ snapshot }) =>
      (start: DragStart) => {
        const currentSelectedRecordIds = getSnapshotValue(
          snapshot,
          recordBoardSelectedRecordIdsSelector,
        );

        startCardDrag(start, currentSelectedRecordIds);
      },
    [recordBoardSelectedRecordIdsSelector, startCardDrag],
  );

  const handleDragEnd: OnDragEndResponder = useRecoilCallback(
    ({ snapshot }) =>
      (result) => {
        endDrag();

        if (!result.destination) return;

        const currentRecordSorts = getSnapshotValue(
          snapshot,
          currentRecordSortCallbackState,
        );

        if (currentRecordSorts.length > 0) {
          openModal(RECORD_INDEX_REMOVE_SORTING_MODAL_ID);
          return;
        }

        const originalSelection = getSnapshotValue(
          snapshot,
          originalSelectionCallbackState,
        );

        processDragOperation(result, originalSelection);
      },
    [
      processDragOperation,
      originalSelectionCallbackState,
      endDrag,
      currentRecordSortCallbackState,
      openModal,
    ],
  );

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={() => {}}>
      {children}
    </DragDropContext>
  );
};
