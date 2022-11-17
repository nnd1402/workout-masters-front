import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthService from '../../../services/AuthService';
import { UserContext } from '../../../contexts/UserContext';

const UserLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);

	const { userName, setUserName } = useContext(UserContext);
	const { setUserLoggedIn } = useContext(UserContext);

	const navigate = useNavigate();

	function handleOnChangeUserName(
		e: React.ChangeEvent<HTMLInputElement>
	): void {
		setUserName(e.target.value);
	}

	function handleOnChangePassword(
		e: React.ChangeEvent<HTMLInputElement>
	): void {
		setPassword(e.target.value);
	}

	async function handleLogin(e: any) {
		e.preventDefault();
		setIsLoading(true);
		setValidated(true);
		setUserLoggedIn(false);
		await AuthService.login(userName, password)
			.then(() => {
				navigate('/list');
				setIsLoading(false);
				setUserLoggedIn(true);
			})
			.catch(() => {
				setShowingAlert(true);
				setErrorMessage('Invalid email or password');
				setIsLoading(false);
				setUserLoggedIn(false);
			});
	}

	return (
		<Container className='form-container'>
			<Form
				className='form'
				noValidate
				validated={validated}
				onSubmit={handleLogin}
			>
				<header>
					<h3 className='form-title'>Login</h3>
				</header>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label className='form-label'>Email address</Form.Label>
					<Form.Control
						type='email'
						className='form-control'
						value={userName}
						onChange={handleOnChangeUserName}
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label className='form-label'>Password</Form.Label>
					<Form.Control
						type='password'
						className='form-control'
						defaultValue={password}
						onChange={handleOnChangePassword}
						pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
					/>
				</Form.Group>
				<Link className='create-new-account-link' to='/register'>
					Create a new account
				</Link>
				<div className='text-center'>
					<Button
						className='styled-btn mt-2'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Spinner animation='border' size='sm' /> : 'Login'}
					</Button>
				</div>
				<div
					className={`${
						isShowingAlert ? 'alert-shown' : 'alert-hidden'
					} 'alert-fail'`}
					onTransitionEnd={() =>
						setTimeout(() => {
							setShowingAlert(false);
						}, 5000)
					}
				>
					<Alert className='text-center mt-2' variant='danger'>
						{errorMessage}
					</Alert>
				</div>
			</Form>
		</Container>
	);
};

export default UserLoginForm;
