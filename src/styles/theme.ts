import { DefaultTheme } from 'styled-components';

const colors = {};

const lightTheme: DefaultTheme = {
    bgColor: 'white',
    textColor: 'black',
    btnColor: '#f0f0f0',
    widgetColor: 'white',
    borderColor: '#e0e0e0',
};

const darkTheme: DefaultTheme = {
    bgColor: '#2c2d33',
    textColor: 'white',
    btnColor: '#3c3d43',
    widgetColor: '#3c3d43',
    borderColor: 'gray',
};

export { lightTheme, darkTheme, colors };
