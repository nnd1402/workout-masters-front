import { useMemo, useState } from 'react';
import DefaultLayout from './components/layout/DefaultLayout';
import { UserContext } from './contexts/UserContext';

function App() {
	const [userName, setUserName] = useState<string>('');
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	const providerValue = useMemo(
		() => ({ userName, setUserName, userLoggedIn, setUserLoggedIn }),
		[userName, setUserName, userLoggedIn, setUserLoggedIn]
	);

	return (
		<UserContext.Provider value={providerValue}>
			<DefaultLayout />
		</UserContext.Provider>
	);
}

export default App;
