import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Nav = () => {
	const [username, setUserName] = useState('');
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	function getUser() {
		setUserLoggedIn(false);
		let user = AuthService.getCurrentUser();
		if (user) {
			setUserName(user.userName);
			setUserLoggedIn(true);
		} else {
			setUserName('');
		}
	}

	function handleLogout() {
		AuthService.logout();
		setUserLoggedIn(false);
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Navbar className='navbar-wrapper'>
			<Container>
				<Navbar.Brand className='navbar-brand' href='/list'>
					Workout Tracker
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className='justify-content-end'>
					{userLoggedIn ? (
						<div>
							<Navbar.Text>
								Signed in as:{' '}
								<span className='navbar-username'>{username}</span>
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
