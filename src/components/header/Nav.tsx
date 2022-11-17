import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import ReactSwitch from 'react-switch';

const Nav = () => {
	const { userName, setUserName } = useContext(UserContext);
	const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
	const { toggleTheme } = useContext(ThemeContext);
	const { theme } = useContext(ThemeContext);

	const navigate = useNavigate();

	function handleLogout() {
		AuthService.logout();
		setUserLoggedIn(false);
		navigate('/login');
		setUserName('');
	}

	useEffect(() => {
		setUserLoggedIn(false);
		let user = AuthService.getCurrentUser();
		if (user) {
			setUserLoggedIn(true);
			setUserName(user.userName);
		}
	}, [setUserName, setUserLoggedIn]);

	return (
		<Navbar className='navbar-wrapper'>
			<Container>
				<Link to='/login' className='navbar-title'>
					<Navbar.Brand className='navbar-brand'>Workout Tracker</Navbar.Brand>
				</Link>
				<Navbar.Toggle />
				<div className='switch-wrapper'>
					<ReactSwitch
						onChange={toggleTheme}
						checked={theme === 'dark'}
						onColor='#eed400'
						onHandleColor='#eed400'
						handleDiameter={30}
						uncheckedIcon={false}
						checkedIcon={false}
						boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
						activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
						height={20}
						width={48}
					/>
				</div>

				<Navbar.Collapse className='justify-content-end'>
					{userLoggedIn ? (
						<div>
							<Link to='/list' className='navbar-username-link'>
								<Navbar.Text>
									<span className='navbar-username'>{userName}</span>
								</Navbar.Text>
							</Link>
							<Button
								className='logout'
								title='Logout'
								variant='transparent'
								onClick={handleLogout}
							>
								<FontAwesomeIcon icon={faRightFromBracket} size='lg' />
							</Button>
						</div>
					) : (
						<Link className='sign-in' to='/login'>
							Sign in
						</Link>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Nav;
