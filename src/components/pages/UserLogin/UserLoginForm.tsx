import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../../../services/AuthService';

const UserLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list');
	}

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

	function handleLogin() {
		setIsLoading(true);
		setValidated(true);
		AuthService.login(userName, password)
			.then(() => {
				navigateToWorkoutListSuccess();
				setIsLoading(false);
			})
			.catch(() => {
				setShowingAlert(true);
				setErrorMessage('Invalid email or password');
				setIsLoading(false);
			});
	}

	return (
		<Container className='form-container'>
			<Form className='form' noValidate validated={validated}>
				<header>
					<h3 className='form-title'>Login</h3>
				</header>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label className='form-label'>Email address</Form.Label>
					<Form.Control
						type='email'
						defaultValue={userName}
						onChange={handleOnChangeUserName}
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label className='form-label'>Password</Form.Label>
					<Form.Control
						type='password'
						defaultValue={password}
						onChange={handleOnChangePassword}
						pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
					/>
				</Form.Group>
				<Link to='/register'>Create a new account</Link>
				<div className='text-center'>
					<Button variant='success' onClick={handleLogin} disabled={isLoading}>
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
