import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        color: ${(props) => props.theme.textColor};
    }
    html {
        background-color: ${(props) => props.theme.bgColor};
        background-image: 
        linear-gradient(to right, #ccc 1px, transparent 1px),
        linear-gradient(to bottom, #838181 1px, transparent 1px);
        background-size: 40px 40px;
        background-repeat: repeat;
    }
    textarea, tr, td, th {
        background-color: ${(props) => props.theme.widgetColor};
    }   
    body {
        color: ${(props) => props.theme.textColor};
    }
    button {
        background-color: ${(props) => props.theme.btnColor};
        color: ${(props) => props.theme.textColor};
        border: ${(props) => props.theme.borderColor} solid 1px;
    }
`;
