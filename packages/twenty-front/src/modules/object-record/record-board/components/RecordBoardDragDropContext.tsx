import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { recordBoardSelectedRecordIdsComponentSelector } from '@/object-record/record-board/states/selectors/recordBoardSelectedRecordIdsComponentSelector';
import { useStartRecordDrag } from '@/object-record/record-drag/shared/hooks/useStartRecordDrag';
import { useRecoilComponentCallbackState } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackState';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import { DragDropContext, type DragStart } from '@hello-pangea/dnd';
import { useContext } from 'react';
import { useRecoilCallback } from 'recoil';

export const RecordBoardDragDropContext = ({
  children,
}: React.PropsWithChildren) => {
  console.log('RecordBoardDragDropContext');
  const { recordBoardId } = useContext(RecordBoardContext);

  // const currentRecordSortCallbackState = useRecoilComponentCallbackState(
  //   currentRecordSortsComponentState,
  // );

  const recordBoardSelectedRecordIdsSelector = useRecoilComponentCallbackState(
    recordBoardSelectedRecordIdsComponentSelector,
    recordBoardId,
  );

  // const originalSelectionCallbackState = useRecoilComponentCallbackState(
  //   originalSelectionComponentState,
  // );

  const { startDrag } = useStartRecordDrag('board', recordBoardId);
  // const { endDrag } = useEndRecordDrag('board', recordBoardId);
  // // const multiDragState = useRecordDragState('board', recordBoardId);

  // const { processDragOperation } = useRecordBoardDragOperations();

  // const { openModal } = useModal();

  const handleDragStart = useRecoilCallback(
    ({ snapshot }) =>
      (start: DragStart) => {
        const currentSelectedRecordIds = getSnapshotValue(
          snapshot,
          recordBoardSelectedRecordIdsSelector,
        );

        startDrag(start, currentSelectedRecordIds);
      },
    [recordBoardSelectedRecordIdsSelector, startDrag],
  );

  // const handleDragEnd: OnDragEndResponder = useRecoilCallback(
  //   ({ snapshot }) =>
  //     (result) => {
  //       endDrag();

  //       if (!result.destination) return;

  //       const currentRecordSorts = getSnapshotValue(
  //         snapshot,
  //         currentRecordSortCallbackState,
  //       );

  //       if (currentRecordSorts.length > 0) {
  //         openModal(RECORD_INDEX_REMOVE_SORTING_MODAL_ID);
  //         return;
  //       }

  //       const originalSelection = getSnapshotValue(
  //         snapshot,
  //         originalSelectionCallbackState,
  //       );

  //       // processDragOperation(result, originalSelection);
  //     },
  //   [
  //     processDragOperation,
  //     originalSelectionCallbackState,
  //     endDrag,
  //     currentRecordSortCallbackState,
  //     openModal,
  //   ],
  // );

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={() => {}}>
      {children}
    </DragDropContext>
  );
};
