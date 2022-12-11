import {
	Container,
	Form,
	Button,
	Spinner,
	Alert,
	Row,
	Col
} from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthService from '../../../services/AuthService';
import { UserContext } from '../../../contexts/UserContext';

const UserLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');

	const { userName, setUserName } = useContext(UserContext);
	const { setUserLoggedIn } = useContext(UserContext);

	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

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

	useEffect(() => {
		function updateAlertMessage() {
			if (showMessage === 'emailSent') {
				setShowAlert(true);
				setAlertMessage(
					'Confirmation email sent successfully, please verify your account before logging in!'
				);
				setTimeout(() => {
					setShowAlert(false);
				}, 5000);
			}
		}
		updateAlertMessage();
	}, [showMessage]);

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
			.catch((err) => {
				setShowingAlert(true);
				if (err.response.data === undefined) {
					setErrorMessage('Server is down, please try again later');
				} else {
					setErrorMessage(err.response.data.toString());
				}
				setIsLoading(false);
				setUserLoggedIn(false);
			});
	}

	return (
		<Container>
			<Row>
				<Col className='alert-wrapper text-center'>
					<Alert
						className={`${
							showAlert ? 'list-alert-shown' : 'list-alert-hidden'
						} `}
						variant='success'
					>
						{alertMessage}
					</Alert>
				</Col>
			</Row>
			<Row>
				<Col className='form-container'>
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

						<Row>
							<Col xs={6}>
								<Link className='link' to='/register'>
									Create a new account
								</Link>
							</Col>
							<Col className='text-end' xs={6}>
								<Link className='link' to='/forgot-password'>
									Forgot password?
								</Link>
							</Col>
						</Row>

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
				</Col>
			</Row>
		</Container>
	);
};

export default UserLoginForm;
