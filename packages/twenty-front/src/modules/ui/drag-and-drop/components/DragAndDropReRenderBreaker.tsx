import { memo } from 'react';

export const DragAndDropReRenderBreaker = memo(
  ({
    children,
  }: React.PropsWithChildren<{
    memoizationId: string;
  }>) => {
    return <>{children}</>;
  },
  (prev, next) => {
    return prev.memoizationId === next.memoizationId;
  },
);
