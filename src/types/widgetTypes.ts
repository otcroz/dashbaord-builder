import { Widget } from './base';

export interface WidgetProps {
    widget: Widget;
    children?: React.ReactNode;
}

export interface WidgetStyleProps {
    $x: number;
    $y: number;
    $w: number;
    $h: number;
    $zindex: number;
}

export interface ResizeProps {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}

export interface widgetPositionProps {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ResizingPositionProps extends widgetPositionProps {
    mouseX: number;
    mouseY: number;
}
