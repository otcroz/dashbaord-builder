import { Dispatch, SetStateAction } from 'react';
import { useWidgetStore } from '../state/widgetStore';
import { ResizeProps } from '../types/widgetTypes';

export const handleMouseDown = (
    e: React.MouseEvent,
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setOffset: Dispatch<SetStateAction<{ offsetX: number; offsetY: number }>>,
    setDraggedWidgetId: Dispatch<SetStateAction<string | null>>,
    localPosition: { x: number; y: number; w: number; h: number },
    setIsResizing: Dispatch<SetStateAction<boolean>>,
    setResizeDirection: Dispatch<SetStateAction<ResizeProps>>,
    widgetId: string,
) => {
    // 드래그 설정
    e.stopPropagation();
    setIsDragging(true);
    setDraggedWidgetId(widgetId);

    // 가장 앞으로 배치
    const { bringToFront } = useWidgetStore.getState();
    bringToFront(widgetId);

    // 마우스 위치 클릭, 위젯 좌표 간 오프셋 계산
    const offsetX = e.clientX - localPosition.x;
    const offsetY = e.clientY - localPosition.y;
    setOffset({ offsetX, offsetY });

    const padding = 40;
    // 마우스 클릭이 리사이즈 위치인지 확인
    const resizeLeft =
        e.clientX >= localPosition.x - padding && e.clientX <= localPosition.x + padding;
    const resizeRight =
        e.clientX >= localPosition.x + localPosition.w - padding &&
        e.clientX <= localPosition.x + localPosition.w + padding;
    const resizeTop =
        e.clientY >= localPosition.y - padding && e.clientY <= localPosition.y + padding;
    const resizeBottom =
        e.clientY >= localPosition.y + localPosition.h - padding &&
        e.clientY <= localPosition.y + localPosition.h + padding;

    // 리사이징 범위 내에 있을 때
    //console.log('start: ', resizeLeft, resizeRight, resizeTop, resizeBottom);
    if (resizeLeft || resizeRight || resizeTop || resizeBottom) {
        setIsResizing(true);
        setResizeDirection({
            left: resizeLeft,
            right: resizeRight,
            top: resizeTop,
            bottom: resizeBottom,
        });
    } else {
        setIsResizing(false);
    }
};

export const handleMouseMove = (
    e: React.MouseEvent,
    isDragging: boolean,
    localPosition: { x: number; y: number; w: number; h: number },
    setLocalPosition: Dispatch<SetStateAction<{ x: number; y: number; w: number; h: number }>>,
    offset: { offsetX: number; offsetY: number },
    isResizing: boolean,
    resizeDirection: { left: boolean; right: boolean; top: boolean; bottom: boolean },
) => {
    // 사이즈 조정
    if (isResizing) {
        if (resizeDirection.left) {
            const newWidth = localPosition.w - (e.clientX - localPosition.x);
            if (newWidth > 0) {
                setLocalPosition((prev) => ({ ...prev, x: e.clientX, w: newWidth }));
            }
        }
        if (resizeDirection.right) {
            const newWidth = e.clientX - localPosition.x;
            if (newWidth > 0) {
                setLocalPosition((prev) => ({ ...prev, w: newWidth }));
            }
        }
        if (resizeDirection.top) {
            const newHeight = localPosition.h - (e.clientY - localPosition.y);
            if (newHeight > 0) {
                setLocalPosition((prev) => ({ ...prev, y: e.clientY, h: newHeight }));
            }
        }
        if (resizeDirection.bottom) {
            const newHeight = e.clientY - localPosition.y;
            if (newHeight > 0) {
                setLocalPosition((prev) => ({ ...prev, h: newHeight }));
            }
        }
    } else if (isDragging) {
        const x = e.clientX - offset.offsetX;
        const y = e.clientY - offset.offsetY;
        setLocalPosition({ x, y, w: localPosition.w, h: localPosition.h });
    }
};

export const handleMouseUp = (
    isDragging: boolean,
    isResizing: boolean,
    draggedWidgetId: string | null,
    localPosition: { x: number; y: number; w: number; h: number },
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setIsResizing: Dispatch<SetStateAction<boolean>>,
    setResizeDirection: Dispatch<SetStateAction<ResizeProps>>,
    setDraggedWidgetId: Dispatch<SetStateAction<string | null>>,
) => {
    if (isResizing && draggedWidgetId != null) {
        // 사이즈 상태 업데이트
        const { setSize } = useWidgetStore.getState();
        const w = localPosition.w;
        const h = localPosition.h;
        setSize(draggedWidgetId, w, h);
        setIsResizing(false);
        setResizeDirection({
            left: false,
            right: false,
            top: false,
            bottom: false,
        });
    } else if (isDragging && draggedWidgetId != null) {
        // 드래그 상태 업데이트
        const { setPosition } = useWidgetStore.getState();
        const x = localPosition.x;
        const y = localPosition.y;
        setPosition(draggedWidgetId, x, y);
    }
    setIsDragging(false);
    setDraggedWidgetId(null);
    //console.log('end isResizing: ', isResizing);
    //console.log('end isDragging: ', isDragging);
};
