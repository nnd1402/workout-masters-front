import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Nav = () => {
	const { userName, setUserName } = useContext(UserContext);
	const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);

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
				<Link to='/list' className='navbar-title'>
					<Navbar.Brand className='navbar-brand'>Workout Tracker</Navbar.Brand>
				</Link>
				<Navbar.Toggle />
				<Navbar.Collapse className='justify-content-end'>
					{userLoggedIn ? (
						<div>
							<Navbar.Text>
								<span className='navbar-username'>{userName}</span>
							</Navbar.Text>
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
