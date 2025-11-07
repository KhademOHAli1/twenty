import { useRecoilCallback } from 'recoil';

import { useRecoilComponentCallbackState } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackState';

import { draggedRecordIdsComponentState } from '@/object-record/record-drag/states/draggedRecordIdsComponentState';
import { isMultiDragActiveComponentState } from '@/object-record/record-drag/states/isMultiDragActiveComponentState';
import { originalSelectionComponentState } from '@/object-record/record-drag/states/originalSelectionComponentState';
import { primaryDraggedRecordIdComponentState } from '@/object-record/record-drag/states/primaryDraggedRecordIdComponentState';

export const useEndRecordDrag = (instanceId?: string) => {
  const isMultiDragActiveCallbackState = useRecoilComponentCallbackState(
    isMultiDragActiveComponentState,
    instanceId,
  );

  const draggedRecordIdsCallbackState = useRecoilComponentCallbackState(
    draggedRecordIdsComponentState,
    instanceId,
  );

  const primaryDraggedRecordIdCallbackState = useRecoilComponentCallbackState(
    primaryDraggedRecordIdComponentState,
    instanceId,
  );

  const originalSelectionCallbackState = useRecoilComponentCallbackState(
    originalSelectionComponentState,
    instanceId,
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
