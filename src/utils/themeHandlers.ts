import { useThemeStore } from '../state/themeStore';

export const changeTheme = (theme: 'light' | 'dark') => {
    const { setTheme } = useThemeStore.getState();
    setTheme(theme);
};
