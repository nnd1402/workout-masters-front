import { Form, Button } from 'react-bootstrap';

const UserRegisterForm = () => {
	return (
		<Form className='register-form'>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control type='email' placeholder='Enter email' />
				<Form.Text className='text-muted'>
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control type='password' placeholder='Password' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Confirm password</Form.Label>
				<Form.Control type='password' placeholder='Password' />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};

export default UserRegisterForm;
