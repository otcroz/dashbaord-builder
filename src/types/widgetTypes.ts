import { Widget } from './base';

export interface WidgetProps {
    widget: Widget;
    children?: React.ReactNode;
}

export interface WidgetStyleProps {
    x: number;
    y: number;
    w: number;
    h: number;
}
