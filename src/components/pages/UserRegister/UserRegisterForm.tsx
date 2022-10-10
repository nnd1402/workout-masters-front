import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UserRegisterForm = () => {
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
						<h3 className='add-workout-title'>Register user</h3>
					</Col>
				</Row>
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
				<Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
					<Form.Label>Confirm password</Form.Label>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>
				<div className='text-center'>
					<Link to='/register-success'>
						<Button variant='success' type='submit'>
							Submit
						</Button>
					</Link>
				</div>
			</Form>
		</Container>
	);
};

export default UserRegisterForm;
