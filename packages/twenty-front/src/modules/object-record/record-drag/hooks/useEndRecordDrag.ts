import { useRecoilCallback } from 'recoil';

import { useRecoilComponentCallbackState } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackState';

import { isMultiDragActiveComponentState } from '@/object-record/record-drag/states/isMultiDragActiveComponentState';

import { draggedRecordIdsComponentState } from '@/object-record/record-drag/states/draggedRecordIdsComponentState';
import { originalDragSelectionComponentState } from '@/object-record/record-drag/states/originalDragSelectionComponentState';
import { primaryDraggedRecordIdComponentState } from '@/object-record/record-drag/states/primaryDraggedRecordIdComponentState';

export const useEndRecordDrag = (contextStoreInstanceId?: string) => {
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
    originalDragSelectionComponentState,
    contextStoreInstanceId,
  );

  const endRecordDrag = useRecoilCallback(
    ({ set }) =>
      () => {
        set(isMultiDragActiveCallbackState, false);
        set(draggedRecordIdsCallbackState, []);
        set(primaryDraggedRecordIdCallbackState, null);
        set(originalSelectionCallbackState, []);
      },
    [
      isMultiDragActiveCallbackState,
      draggedRecordIdsCallbackState,
      primaryDraggedRecordIdCallbackState,
      originalSelectionCallbackState,
    ],
  );

  return { endRecordDrag };
};
