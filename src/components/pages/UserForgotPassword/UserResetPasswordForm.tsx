import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const UserResetPasswordForm = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);

	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();

	const email = query.get('Email');
	const token = query.get('token');

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

	const navigate = useNavigate();

	function navigateToResetPasswordSuccess() {
		navigate('/reset-password-success');
	}

	async function handleResetPassword(e: any) {
		e.preventDefault();
		setIsLoading(true);
		setValidated(true);
		if (password !== confirmPassword) {
			setShowingAlert(true);
			setErrorMessage('Please match the password');
			setIsLoading(false);
		} else {
			await axios
				.post(
					`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/ResetPassword`,
					{ UserName: email, Token: token, Password: password },
					{ headers: { 'Content-Type': 'application/json' } }
				)
				.then(() => {
					navigateToResetPasswordSuccess();
					setIsLoading(false);
				})
				.catch((err) => {
					setShowingAlert(true);
					if (err.response.data === undefined) {
						setErrorMessage('Server is down, please try again later');
					} else {
						setErrorMessage(err.response.data.toString());
					}
					setIsLoading(false);
				});
		}
	}

	return (
		<Container className='form-container'>
			<Form
				className='form p-4 p-sm-3'
				noValidate
				validated={validated}
				onSubmit={handleResetPassword}
			>
				<header>
					<h3 className='form-title'>Change your password</h3>
				</header>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label className='form-label'>New Password:</Form.Label>
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
				<input type='hidden' asp-for='UserName' className='form-control' />
				<input type='hidden' asp-for='Token' className='form-control' />
				<div className='text-center'>
					<Button
						className='styled-btn mt-2'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? (
							<Spinner animation='border' size='sm' />
						) : (
							'Reset Password'
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

export default UserResetPasswordForm;
