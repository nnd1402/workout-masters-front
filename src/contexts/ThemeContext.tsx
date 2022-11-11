import { createContext } from 'react';

type ThemeContexttype = {
	theme: string;
	toggleTheme: () => void;
};
const iUserContextState = {
	theme: '',
	toggleTheme: () => {}
};

export const ThemeContext = createContext<ThemeContexttype>(iUserContextState);
