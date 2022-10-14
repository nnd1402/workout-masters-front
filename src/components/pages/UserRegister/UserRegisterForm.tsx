import { useState } from 'react';
import {
	Container,
	Form,
	Button,
	Row,
	Col,
	Spinner,
	Alert
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../../services/AuthService';

const UserRegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validated, setValidated] = useState(false);

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

	function handleRegister() {
		if (password !== confirmPassword) {
			alert('Please match password');
		}
		setIsLoading(true);
		setValidated(true);
		AuthService.register(userName, password)
			.then(() => {
				navigateRegisterSuccess();
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
				<Row>
					<Col xs={1}>
						<Link to='/list' className='text-center'>
							<FontAwesomeIcon
								className='arrow-left-icon'
								icon={faArrowLeft}
								size='2x'
							/>
						</Link>
					</Col>
					<Col xs={10}>
						<h3 className='add-workout-title'>Register user</h3>
					</Col>
				</Row>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address:</Form.Label>
					<Form.Control
						type='email'
						defaultValue={userName}
						onChange={handleOnChangeUserName}
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					/>
					<span className='validation-error'>
						Email should be in standard email format (e.g. my@example.com)
					</span>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type='password'
						defaultValue={password}
						onChange={handleOnChangePassword}
						pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
					/>
					<span className='validation-error'>
						Password must contain at least one number and one uppercase and
						lowercase letter, and at least 6 or more characters
					</span>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
					<Form.Label>Confirm password:</Form.Label>
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
					<Button
						type='submit'
						variant='success'
						onClick={handleRegister}
						disabled={isLoading}
					>
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
