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
import { useState } from 'react';
import AuthService from '../../../services/AuthService';

const UserLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

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

	// const loginAccount = () => {
	// 	setIsLoading(true);

	// 	Axios.post(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/login`, {
	// 		userName: userName,
	// 		password: password
	// 	})
	// 		.then(() => {
	// 			navigateToWorkoutListSuccess();
	// 			setIsLoading(false);
	// 		})
	// 		.catch(() => {
	// 			setShowingAlert(true);
	// 			setErrorMessage('Invalid email or password');
	// 			setIsLoading(false);
	// 		});
	// };

	return (
		<Container className='form-container'>
			<Form className='form'>
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
						<h3 className='add-workout-title'>Login</h3>
					</Col>
				</Row>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='email'
						placeholder='Username'
						defaultValue={userName}
						onChange={handleOnChangeUserName}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						defaultValue={password}
						onChange={handleOnChangePassword}
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
