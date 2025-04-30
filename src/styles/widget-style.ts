import styled from 'styled-components';

export const BaseBg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 10rem;
    height: 10rem;
    background-color: white;
    padding: 1rem;
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
`;

// 텍스트 블록 위젯 스타일
export const TextBlock = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    white-space: pre-wrap;
`;

// 라인 차트 위젯 스타일
export const ChartTitle = styled.h3`
    margin-bottom: 0.8rem;
    color: black;
    font-size: 1rem;
`;
