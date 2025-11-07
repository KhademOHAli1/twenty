import styled from '@emotion/styled';
import { NotificationCounter } from 'twenty-ui/navigation';

import { originalDragSelectionComponentState } from '@/object-record/record-drag/states/originalDragSelectionComponentState';
import { useRecordTableRowContextOrThrow } from '@/object-record/record-table/contexts/RecordTableRowContext';
import { useRecoilComponentValue } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValue';

const StyledNotificationCounter = styled(NotificationCounter)`
  position: absolute;
  top: -7px;
  left: -7px;
  z-index: 1000;
`;

type RecordTableRowMultiDragPreviewProps = {
  isDragging: boolean;
};

export const RecordTableRowMultiDragPreview = ({
  isDragging,
}: RecordTableRowMultiDragPreviewProps) => {
  const { recordId } = useRecordTableRowContextOrThrow();

  const originalDragSelection = useRecoilComponentValue(
    originalDragSelectionComponentState,
  );

  const isCurrentRowSelected =
    originalDragSelection.includes(recordId) || false;
  const selectedCount = originalDragSelection.length ?? 0;

  const shouldShow = isDragging && isCurrentRowSelected && selectedCount > 1;

  if (!shouldShow) {
    return null;
  }

  return <StyledNotificationCounter count={selectedCount} />;
};
