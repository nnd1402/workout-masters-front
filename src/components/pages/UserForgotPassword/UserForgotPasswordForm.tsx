import { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserForgotPasswordForm = () => {
	const [userName, setUsername] = useState('');
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function handleOnChangeUserName(
		e: React.ChangeEvent<HTMLInputElement>
	): void {
		setUsername(e.target.value);
	}

	function handleForgotPassword() {}

	return (
		<Container className='form-container'>
			<Form
				className='form'
				noValidate
				validated={validated}
				onSubmit={handleForgotPassword}
			>
				<header>
					<h3 className='form-title'>Forgot Password</h3>
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
				<Link className='link mt-2' to='/login'>
					Back to Login
				</Link>
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
			</Form>
		</Container>
	);
};

export default UserForgotPasswordForm;
