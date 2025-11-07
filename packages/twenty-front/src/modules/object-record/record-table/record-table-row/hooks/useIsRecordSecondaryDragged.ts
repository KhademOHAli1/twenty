import { isDraggingRecordComponentState } from '@/object-record/record-drag/states/isDraggingRecordComponentState';
import { originalDragSelectionComponentState } from '@/object-record/record-drag/states/originalDragSelectionComponentState';
import { primaryDraggedRecordIdComponentState } from '@/object-record/record-drag/states/primaryDraggedRecordIdComponentState';
import { useRecoilComponentValue } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValue';
import { isNonEmptyString } from '@sniptt/guards';

export const useIsTableRowSecondaryDragged = (recordId: string | null) => {
  const isDraggingRecord = useRecoilComponentValue(
    isDraggingRecordComponentState,
  );

  const originalDragSelection = useRecoilComponentValue(
    originalDragSelectionComponentState,
  );

  const primaryDraggedRecordId = useRecoilComponentValue(
    primaryDraggedRecordIdComponentState,
  );

  const isSecondaryDragged =
    isDraggingRecord &&
    isNonEmptyString(recordId) &&
    originalDragSelection.includes(recordId) &&
    recordId !== primaryDraggedRecordId;

  return {
    isSecondaryDragged,
  };
};
