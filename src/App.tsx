import { useMemo, useState } from 'react';
import DefaultLayout from './components/layout/DefaultLayout';
import { UserContext } from './contexts/UserContext';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
	const [userName, setUserName] = useState<string>('');
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [theme, setTheme] = useState('dark');

	const providerValue = useMemo(
		() => ({ userName, setUserName, userLoggedIn, setUserLoggedIn }),
		[userName, setUserName, userLoggedIn, setUserLoggedIn]
	);

	const toggleTheme = () => {
		setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<UserContext.Provider value={providerValue}>
				<div className='App' id={theme}>
					<DefaultLayout />
				</div>
			</UserContext.Provider>
		</ThemeContext.Provider>
	);
}

export default App;
