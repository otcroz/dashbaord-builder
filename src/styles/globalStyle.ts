import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
    }
    textarea, tr, td, th {
        background-color: ${(props) => props.theme.widgetColor};
    }   
    body {
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
    }
    button {
        background-color: ${(props) => props.theme.btnColor};
        color: ${(props) => props.theme.textColor};
        border: ${(props) => props.theme.borderColor} solid 1px;
    }
`;
