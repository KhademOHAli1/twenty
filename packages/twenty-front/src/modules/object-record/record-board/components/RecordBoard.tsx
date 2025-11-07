import styled from '@emotion/styled';
// Atlassian dnd does not support StrictMode from RN 18, so we use a fork @hello-pangea/dnd https://github.com/atlassian/react-beautiful-dnd/issues/2350
import { useContext, useRef } from 'react';

import { RecordBoardClickOutsideEffect } from '@/object-record/record-board/components/RecordBoardClickOutsideEffect';
import { RecordBoardDragDropContext } from '@/object-record/record-board/components/RecordBoardDragDropContext';
import { RecordBoardHeader } from '@/object-record/record-board/components/RecordBoardHeader';
import { RecordBoardScrollToFocusedCardEffect } from '@/object-record/record-board/components/RecordBoardScrollToFocusedCardEffect';
import { RecordBoardStickyHeaderEffect } from '@/object-record/record-board/components/RecordBoardStickyHeaderEffect';
import { RECORD_BOARD_CLICK_OUTSIDE_LISTENER_ID } from '@/object-record/record-board/constants/RecordBoardClickOutsideListenerId';
import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { useRecordBoardSelection } from '@/object-record/record-board/hooks/useRecordBoardSelection';
import { RecordBoardDeactivateBoardCardEffect } from '@/object-record/record-board/record-board-card/components/RecordBoardDeactivateBoardCardEffect';
import { RecordBoardColumn } from '@/object-record/record-board/record-board-column/components/RecordBoardColumn';
import { RecordBoardComponentInstanceContext } from '@/object-record/record-board/states/contexts/RecordBoardComponentInstanceContext';
import { visibleRecordGroupIdsComponentFamilySelector } from '@/object-record/record-group/states/selectors/visibleRecordGroupIdsComponentFamilySelector';
import { useCloseAnyOpenDropdown } from '@/ui/layout/dropdown/hooks/useCloseAnyOpenDropdown';
import { DragSelect } from '@/ui/utilities/drag-select/components/DragSelect';
import { RECORD_INDEX_DRAG_SELECT_BOUNDARY_CLASS } from '@/ui/utilities/drag-select/constants/RecordIndecDragSelectBoundaryClass';
import { useClickOutsideListener } from '@/ui/utilities/pointer-event/hooks/useClickOutsideListener';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import { useRecoilComponentFamilyValue } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentFamilyValue';
import { ViewType } from '@/views/types/ViewType';

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 100%;
  position: relative;
`;

const StyledColumnContainer = styled.div`
  display: flex;

  & > *:not(:first-of-type) {
    border-left: 1px solid ${({ theme }) => theme.border.color.light};
  }
`;

const StyledContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - ${({ theme }) => theme.spacing(2)});
  height: min-content;
`;

const StyledBoardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RecordBoard = () => {
  const { recordBoardId } = useContext(RecordBoardContext);
  const boardRef = useRef<HTMLDivElement>(null);

  const { toggleClickOutside } = useClickOutsideListener(
    RECORD_BOARD_CLICK_OUTSIDE_LISTENER_ID,
  );

  const { closeAnyOpenDropdown } = useCloseAnyOpenDropdown();

  const handleDragSelectionStart = () => {
    closeAnyOpenDropdown();
    toggleClickOutside(false);
  };

  const handleDragSelectionEnd = () => {
    toggleClickOutside(true);
  };

  const visibleRecordGroupIds = useRecoilComponentFamilyValue(
    visibleRecordGroupIdsComponentFamilySelector,
    ViewType.Kanban,
  );

  const { setRecordAsSelected } = useRecordBoardSelection(recordBoardId);

  return (
    <RecordBoardComponentInstanceContext.Provider
      value={{ instanceId: recordBoardId }}
    >
      <ScrollWrapper
        componentInstanceId={`scroll-wrapper-record-board-${recordBoardId}`}
      >
        <RecordBoardStickyHeaderEffect />
        <RecordBoardScrollToFocusedCardEffect />
        <RecordBoardDeactivateBoardCardEffect />
        <StyledContainerContainer>
          <RecordBoardHeader />
          <StyledBoardContentContainer>
            <StyledContainer ref={boardRef}>
              <RecordBoardDragDropContext>
                <StyledColumnContainer>
                  {visibleRecordGroupIds.map((recordGroupId, index) => {
                    return (
                      <RecordBoardColumn
                        key={recordGroupId}
                        recordBoardColumnId={recordGroupId}
                        recordBoardColumnIndex={index}
                      />
                    );
                  })}
                </StyledColumnContainer>
              </RecordBoardDragDropContext>
              <DragSelect
                selectableItemsContainerRef={boardRef}
                onDragSelectionEnd={handleDragSelectionEnd}
                onDragSelectionChange={setRecordAsSelected}
                onDragSelectionStart={handleDragSelectionStart}
                scrollWrapperComponentInstanceId={`scroll-wrapper-record-board-${recordBoardId}`}
                selectionBoundaryClass={RECORD_INDEX_DRAG_SELECT_BOUNDARY_CLASS}
              />
            </StyledContainer>
          </StyledBoardContentContainer>
        </StyledContainerContainer>
      </ScrollWrapper>
      <RecordBoardClickOutsideEffect />
    </RecordBoardComponentInstanceContext.Provider>
  );
};
