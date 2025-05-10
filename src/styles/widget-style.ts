import styled from 'styled-components';
import { WidgetStyleProps } from '../types/widgetTypes';

export const BaseBg = styled.div.attrs<WidgetStyleProps>((props) => ({
    style: {
        top: `${props.$y}px`,
        left: `${props.$x}px`,
        zIndex: `${props.$zindex}`,
        width: `${props.$w}px`,
        height: `${props.$h}px`,
    },
}))`
    position: absolute;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.widgetColor};
    border-radius: 1rem;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
`;

// 테이블 위젯 스타일
export const StyledTable = styled.table`
    border-collapse: collapse;
`;

export const StyledCell = styled.td`
    border: 0.2rem solid #ccc;
    padding: 0.2rem;
    text-align: center;
    font-size: 0.6rem;
`;

// 텍스트 블록 위젯 스타일
export const TextBlock = styled.textarea`
    width: 80%;
    height: 80%;
    border: none;
    resize: none;
    white-space: pre-wrap;
    border: 0.1rem solid #ccc;
    border-radius: 1rem;
`;

// 라인 차트 위젯 스타일
export const ChartTitle = styled.h3`
    margin-bottom: 0.8rem;
    font-size: 1rem;
    background-color: transparent;
`;
