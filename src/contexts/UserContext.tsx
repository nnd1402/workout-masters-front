import { createContext } from 'react';

type UserContextType = {
	userName: string;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	userLoggedIn: boolean;
	setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const iUserContextState = {
	userName: '',
	setUserName: () => {},
	userLoggedIn: false,
	setUserLoggedIn: () => {}
};

export const UserContext = createContext<UserContextType>(iUserContextState);
