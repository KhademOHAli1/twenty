import { draggedRecordIdsComponentState } from '@/object-record/record-drag/states/draggedRecordIdsComponentState';
import { isMultiDragActiveComponentState } from '@/object-record/record-drag/states/isMultiDragActiveComponentState';
import { originalSelectionComponentState } from '@/object-record/record-drag/states/originalSelectionComponentState';
import { primaryDraggedRecordIdComponentState } from '@/object-record/record-drag/states/primaryDraggedRecordIdComponentState';
import { getDragOperationType } from '@/object-record/record-drag/utils/getDragOperationType';
import { useRecoilComponentCallbackState } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackState';
import { type DragStart } from '@hello-pangea/dnd';
import { useRecoilCallback } from 'recoil';

export type UseStartRecordDragParams = {
  contextStoreInstanceId?: string;
};

export const useStartRecordDrag = ({
  contextStoreInstanceId,
}: UseStartRecordDragParams) => {
  const isMultiDragActiveCallbackState = useRecoilComponentCallbackState(
    isMultiDragActiveComponentState,
    contextStoreInstanceId,
  );

  const draggedRecordIdsCallbackState = useRecoilComponentCallbackState(
    draggedRecordIdsComponentState,
    contextStoreInstanceId,
  );

  const primaryDraggedRecordIdCallbackState = useRecoilComponentCallbackState(
    primaryDraggedRecordIdComponentState,
    contextStoreInstanceId,
  );

  const originalSelectionCallbackState = useRecoilComponentCallbackState(
    originalSelectionComponentState,
    contextStoreInstanceId,
  );

  const startRecordDrag = useRecoilCallback(
    ({ set }) =>
      (start: DragStart, selectedRecordIds: string[]) => {
        const draggedRecordId = start.draggableId;

        const dragOperationType = getDragOperationType({
          draggedRecordId,
          selectedRecordIds,
        });

        if (dragOperationType === 'multi') {
          set(isMultiDragActiveCallbackState, true);
          set(draggedRecordIdsCallbackState, selectedRecordIds);
          set(primaryDraggedRecordIdCallbackState, draggedRecordId);
          set(originalSelectionCallbackState, selectedRecordIds);
        } else {
          set(isMultiDragActiveCallbackState, true);
          set(draggedRecordIdsCallbackState, [draggedRecordId]);
          set(primaryDraggedRecordIdCallbackState, draggedRecordId);
          set(originalSelectionCallbackState, [draggedRecordId]);
        }
      },
    [
      isMultiDragActiveCallbackState,
      draggedRecordIdsCallbackState,
      primaryDraggedRecordIdCallbackState,
      originalSelectionCallbackState,
    ],
  );

  return {
    startRecordDrag,
  };
};
