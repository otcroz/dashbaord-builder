import Dashboard from './components/Dashboard';
import { ThemeProvider } from 'styled-components';
import { useThemeStore } from './store/themeStore';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { StyledToastConatiner } from './styles/toast-style';

function App() {
    const { theme } = useThemeStore();

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <StyledToastConatiner limit={1} />
            <GlobalStyle />
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;
