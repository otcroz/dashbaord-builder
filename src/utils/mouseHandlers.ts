import { Dispatch, SetStateAction } from 'react';
import { ResizeProps, ResizingPositionProps, widgetPositionProps } from '../types/widgetTypes';

const padding = 20;

export const handleMouseDown = (
    e: React.MouseEvent,
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setOffset: Dispatch<SetStateAction<{ offsetX: number; offsetY: number }>>,
    setDraggedWidgetId: Dispatch<SetStateAction<string | null>>,
    localPosition: widgetPositionProps,
    setIsResizing: Dispatch<SetStateAction<boolean>>,
    setResizeDirection: Dispatch<SetStateAction<ResizeProps>>,
    widgetId: string,
    bringToFront: (id: string) => void,
    setStartResizing: Dispatch<SetStateAction<ResizingPositionProps>>,
) => {
    // 드래그 설정
    e.stopPropagation();
    setIsDragging(true);
    setDraggedWidgetId(widgetId);

    // 가장 앞으로 배치
    bringToFront(widgetId);

    // 마우스 위치 클릭, 위젯 좌표 간 오프셋 계산
    const offsetX = e.clientX - localPosition.x;
    const offsetY = e.clientY - localPosition.y;
    setOffset({ offsetX, offsetY });

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
        setStartResizing({
            x: localPosition.x,
            y: localPosition.y,
            w: localPosition.w,
            h: localPosition.h,
            mouseX: e.clientX,
            mouseY: e.clientY,
        }); // 리사이징 시작 위치 설정
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
    localPosition: widgetPositionProps,
    setLocalPosition: Dispatch<SetStateAction<widgetPositionProps>>,
    offset: { offsetX: number; offsetY: number },
    isResizing: boolean,
    resizeDirection: { left: boolean; right: boolean; top: boolean; bottom: boolean },
    startResizing: ResizingPositionProps,
) => {
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

    // 마우스 커서 스타일 수정
    if (resizeLeft && resizeTop) {
        document.body.style.cursor = 'nwse-resize';
    } else if (resizeRight && resizeBottom) {
        document.body.style.cursor = 'nwse-resize';
    } else if (resizeLeft && resizeBottom) {
        document.body.style.cursor = 'nesw-resize';
    } else if (resizeRight && resizeTop) {
        document.body.style.cursor = 'nesw-resize';
    } else if (resizeLeft || resizeRight) {
        document.body.style.cursor = 'ew-resize';
    } else if (resizeTop || resizeBottom) {
        document.body.style.cursor = 'ns-resize';
    } else {
        document.body.style.cursor = 'move';
    }

    // 사이즈 조정
    if (isResizing) {
        const curX = e.clientX;
        const curY = e.clientY;

        if (resizeDirection.left) {
            const delta = curX - startResizing.mouseX;
            const newWidth = startResizing.w - delta;
            if (newWidth > 0) {
                setLocalPosition((prev) => ({ ...prev, x: startResizing.x + delta, w: newWidth }));
            }
        }
        if (resizeDirection.right) {
            const delta = curX - startResizing.mouseX;
            const newWidth = startResizing.w + delta;
            if (newWidth > 0) {
                setLocalPosition((prev) => ({ ...prev, w: newWidth }));
            }
        }
        if (resizeDirection.top) {
            const delta = curY - startResizing.mouseY;
            const newHeight = startResizing.h - delta;
            if (newHeight > 0) {
                setLocalPosition((prev) => ({
                    ...prev,
                    y: startResizing.y + delta,
                    h: newHeight,
                }));
            }
        }
        if (resizeDirection.bottom) {
            const delta = curY - startResizing.mouseY;
            const newHeight = startResizing.h + delta;
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
    setSize: (id: string, w: number, h: number) => void,
    setPosition: (id: string, x: number, y: number) => void,
    setStartResizing: Dispatch<SetStateAction<ResizingPositionProps>>,
) => {
    if (isResizing && draggedWidgetId != null) {
        // 사이즈 상태 업데이트
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
        const x = localPosition.x;
        const y = localPosition.y;
        setPosition(draggedWidgetId, x, y);
    }
    setIsDragging(false);
    setDraggedWidgetId(null);
    setStartResizing({ x: 0, y: 0, w: 0, h: 0, mouseX: 0, mouseY: 0 });
};
