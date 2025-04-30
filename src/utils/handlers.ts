import { Dispatch, SetStateAction } from 'react';
import { useWidgetStore } from '../state/store';

export const handleMouseDown = (
    e: React.MouseEvent,
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setOffset: Dispatch<SetStateAction<{ offsetX: number; offsetY: number }>>,
    setDraggedWidgetId: Dispatch<SetStateAction<string | null>>,
    localPosition: { x: number; y: number },
    widgetId: string,
) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedWidgetId(widgetId);

    // 마우스 위치 클릭, 위젯 좌표 간 오프셋 계산
    const offsetX = e.clientX - localPosition.x;
    const offsetY = e.clientY - localPosition.y;
    setOffset({ offsetX, offsetY });
};

export const handleMouseMove = (
    e: React.MouseEvent,
    isDragging: boolean,
    localPosition: { x: number; y: number; w: number; h: number },
    setLocalPosition: Dispatch<SetStateAction<{ x: number; y: number; w: number; h: number }>>,
    offset: { offsetX: number; offsetY: number },
) => {
    if (isDragging) {
        const x = e.clientX - offset.offsetX;
        const y = e.clientY - offset.offsetY;
        setLocalPosition({ x, y, w: localPosition.w, h: localPosition.h });
    }
};

export const handleMouseUp = (
    isDragging: boolean,
    draggedWidgetId: string | null,
    localPosition: { x: number; y: number },
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    setDraggedWidgetId: Dispatch<SetStateAction<string | null>>,
) => {
    if (isDragging && draggedWidgetId != null) {
        const { setPosition } = useWidgetStore.getState();
        const x = localPosition.x;
        const y = localPosition.y;
        setPosition(draggedWidgetId, x, y);
    }
    setIsDragging(false);
    setDraggedWidgetId(null);
};
