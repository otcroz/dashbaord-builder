import Dashboard from './components/Dashboard';
import { ThemeProvider } from 'styled-components';
import { useThemeStore } from './store/themeStore';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/global';

function App() {
    const { theme } = useThemeStore();

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;
