export interface Widget {
    id: string;
    type: string; // chart, table, text
    position: Position;
    size: Size;
    //props: // type 마다 들어갈 내용이 달라짐.
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    w: number;
    h: number;
}
