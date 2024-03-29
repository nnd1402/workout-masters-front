import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const UserForgotPasswordForm = () => {
	const [email, setEmail] = useState('');
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);

	function handleOnChangeUserName(
		e: React.ChangeEvent<HTMLInputElement>
	): void {
		setEmail(e.target.value);
	}

	const navigate = useNavigate();
	function navigateToRequestSuccess() {
		navigate('/request-reset-password-success');
	}

	async function handleForgotPassword(e: any) {
		e.preventDefault();
		setValidated(true);
		setIsLoading(true);
		await axios
			.post(
				`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/ForgotPassword`,
				{ Username: email },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			.then(() => {
				setIsLoading(false);
				navigateToRequestSuccess();
				console.log(
					'We’ve sent you an email with a link to reset your password.'
				);
			})
			.catch((err) => {
				setIsLoading(false);
				setShowingAlert(true);
				if (err.response.data === undefined) {
					setErrorMessage('Server is down, please try again later');
				} else {
					setErrorMessage(err.response.data.toString());
				}
			});
	}

	return (
		<Container className='form-container'>
			<Form
				className='form p-4 p-sm-3'
				noValidate
				validated={validated}
				onSubmit={handleForgotPassword}
			>
				<header>
					<h3 className='form-title'>Forgot Password?</h3>
				</header>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label className='form-label'>Email address</Form.Label>
					<Form.Control
						type='email'
						className='form-control'
						value={email}
						onChange={handleOnChangeUserName}
						pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
					/>
				</Form.Group>
				<Link className='link mt-2' to='/login'>
					Back to Login
				</Link>
				<div className='text-center'>
					<Button
						className='styled-btn forgot-password-btn mt-2'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? (
							<Spinner animation='border' size='sm' />
						) : (
							'Request Password Reset Link'
						)}
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

export default UserForgotPasswordForm;
