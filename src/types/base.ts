export interface Widget {
    id: string;
    type: string; // chart, table, text
    position: Position;
    size: Size;
    props: TextProps; // ChartProps | TableProps | TextProps;
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    w: number;
    h: number;
}

interface TextProps {
    content: string;
}
