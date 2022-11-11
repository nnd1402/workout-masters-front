import { useContext, useState } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import AuthService from '../../../services/AuthService';

const UserRegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validated, setValidated] = useState(false);
	//const { setUserLoggedIn } = useContext(UserContext);
	const { userName, setUserName } = useContext(UserContext);

	const navigate = useNavigate();

	function navigateRegisterSuccess() {
		navigate('/register-success');
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

	function handleOnChangeConfirmPassword(
		e: React.ChangeEvent<HTMLInputElement>
	): void {
		setConfirmPassword(e.target.value);
	}

	function handleRegister(e: any) {
		e.preventDefault();
		setIsLoading(true);
		setValidated(true);
		if (password !== confirmPassword) {
			setShowingAlert(true);
			setErrorMessage('Please match the password');
			setIsLoading(false);
		} else {
			AuthService.register(userName, password)
				.then(() => {
					navigateRegisterSuccess();
					//setUserLoggedIn(true);
					setIsLoading(false);
				})
				.catch(() => {
					setShowingAlert(true);
					setErrorMessage('Invalid email or password');
					setIsLoading(false);
				});
		}
	}

	return (
		<Container className='form-container'>
			<Form
				className='form'
				noValidate
				validated={validated}
				onSubmit={handleRegister}
			>
				<header>
					<h3 className='form-title'>Register user</h3>
				</header>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label className='form-label'>Email address:</Form.Label>
					<Form.Control
						type='email'
						value={userName}
						onChange={handleOnChangeUserName}
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					/>
					<span className='validation-error'>
						Email should be in standard email format (e.g. my@example.com)
					</span>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label className='form-label'>Password:</Form.Label>
					<Form.Control
						type='password'
						defaultValue={password}
						onChange={handleOnChangePassword}
						pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
					/>
					<span className='validation-error'>
						Password must contain at least one number and one uppercase and
						lowercase letter, and at least 8 or more characters
					</span>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
					<Form.Label className='form-label'>Confirm password:</Form.Label>
					<Form.Control
						type='password'
						name='confirmPassword'
						defaultValue={confirmPassword}
						onChange={handleOnChangeConfirmPassword}
						pattern={password}
					/>
					<span className='validation-error'>
						Confirm password is not matched
					</span>
				</Form.Group>
				<div className='text-center'>
					<Button className='styled-btn' type='submit' disabled={isLoading}>
						{isLoading ? <Spinner animation='border' size='sm' /> : 'Register'}
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

export default UserRegisterForm;
