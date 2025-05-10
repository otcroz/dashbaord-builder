import { useState } from 'react';
import { BaseBg } from '../styles/widget-style';
import { ResizeProps, WidgetProps } from '../types/widgetTypes';
import { handleMouseDown, handleMouseMove, handleMouseUp } from '../utils/mouseHandlers';
import { useWidgetStore } from '../store/widgetStore';
import { useShallow } from 'zustand/react/shallow';
import { memo } from 'react';
import { areEqual } from '../utils/iswidgetEqual';

const BaseWidget = ({ widget, children }: WidgetProps) => {
    const { setPosition, setSize, bringToFront } = useWidgetStore(
        useShallow((state) => ({
            setPosition: state.setPosition,
            setSize: state.setSize,
            bringToFront: state.bringToFront,
        })),
    );

    const [isDragging, setIsDragging] = useState(false);
    const [localPosition, setLocalPosition] = useState({
        x: widget.position.x,
        y: widget.position.y,
        w: widget.size.w,
        h: widget.size.h,
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
    const [startResizing, setStartResizing] = useState({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        mouseX: 0,
        mouseY: 0,
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
                    bringToFront,
                    setStartResizing,
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
                    startResizing,
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
                    setSize,
                    setPosition,
                    setStartResizing,
                )
            }
        >
            <BaseBg
                $x={localPosition.x}
                $y={localPosition.y}
                $w={localPosition.w}
                $h={localPosition.h}
                $zindex={widget.props.zIndex}
            >
                {children}
            </BaseBg>
        </div>
    );
};

export default memo(BaseWidget, areEqual);
