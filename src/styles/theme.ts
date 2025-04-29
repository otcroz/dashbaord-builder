import { DefaultTheme } from 'styled-components';

const colors = {};

const lightTheme: DefaultTheme = {
    bgColor: 'white',
    textColor: 'black',
    borderColor: '1px solid #EAEAEA',
};

const darkTheme: DefaultTheme = {
    bgColor: 'black',
    textColor: 'yellow',
    borderColor: '1px solid #2c2d33',
};

export { lightTheme, darkTheme, colors };
