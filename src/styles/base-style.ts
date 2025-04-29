// 컴포넌트 스타일 정의
import styled from 'styled-components';

export const GridBg = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;

    background-image: linear-gradient(to right, #ccc 1px, transparent 1px),
        linear-gradient(to bottom, #ccc 1px, transparent 1px);
    background-size: 40px 40px;
`;
