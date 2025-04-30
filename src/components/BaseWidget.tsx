import { useState } from 'react';
import { BaseBg } from '../styles/widget-style';
import { ResizeProps, WidgetProps } from '../types/widgetTypes';
import { handleMouseDown, handleMouseMove, handleMouseUp } from '../utils/handlers';

const BaseWidget = ({ widget, children }: WidgetProps) => {
    const { size, position } = widget;
    const [isDragging, setIsDragging] = useState(false);
    const [localPosition, setLocalPosition] = useState({
        x: position.x,
        y: position.y,
        w: size.w,
        h: size.h,
    });
    const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
    const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });

    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<ResizeProps>({
        left: false,
        right: false,
        top: false,
        bottom: false,
    });

    return (
        <div
            onMouseDown={(e) =>
                handleMouseDown(
                    e,
                    setIsDragging,
                    setOffset,
                    setDraggedWidgetId,
                    localPosition,
                    setIsResizing,
                    setResizeDirection,
                    widget.id,
                )
            }
            onMouseMove={(e) =>
                handleMouseMove(
                    e,
                    isDragging,
                    localPosition,
                    setLocalPosition,
                    offset,
                    isResizing,
                    resizeDirection,
                )
            }
            onMouseUp={() =>
                handleMouseUp(
                    isDragging,
                    isResizing,
                    draggedWidgetId,
                    localPosition,
                    setIsDragging,
                    setIsResizing,
                    setResizeDirection,
                    setDraggedWidgetId,
                )
            }
        >
            <BaseBg x={localPosition.x} y={localPosition.y} w={localPosition.w} h={localPosition.h}>
                {children}
            </BaseBg>
        </div>
    );
};

export default BaseWidget;
