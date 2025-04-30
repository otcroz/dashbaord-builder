// 컴포넌트 스타일 정의
import styled from 'styled-components';

export const GridBg = styled.div`
    width: 100vw;
    height: 100vh;

    background-image: linear-gradient(to right, #ccc 1px, transparent 1px),
        linear-gradient(to bottom, rgb(131, 129, 129) 1px, transparent 1px);
    background-size: 40px 40px;
`;

// 버튼 스타일
export const ButtonBox = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    display: flex;
    gap: 1rem;
`;

export const Button = styled.button`
    width: 10rem;
    height: 3rem;
    font-size: 1rem;
    border-radius: 1rem;
    border-width: none;
`;

// 위젯 스타일 선택
export const Menubox = styled.div`
    position: absolute;
    top: 5rem;
    right: 1rem;

    width: 10rem;
    height: 3rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`;

export const Menu = styled.button`
    width: 10rem;
    height: 2rem;
`;
