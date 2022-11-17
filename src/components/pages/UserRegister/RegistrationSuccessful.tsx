import { Button, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RegistrationSuccessful = () => {
	return (
		<Container className='card-container text-center'>
			<Card className='success-card'>
				<Card.Header className='success-card-header text-center'>
					<FontAwesomeIcon
						className='success-registration-icon'
						icon={faCircleCheck}
					/>
				</Card.Header>
				<Card.Body className='success-card-body'>
					<Card.Title>
						<h1>Registration Successful!</h1>
					</Card.Title>
					<Card.Text>
						<h2>Your account has been successfully created.</h2>
					</Card.Text>
					<Card.Text>
						<h4 className=''>
							Confirmation email has been sent to your email address. Please
							login after confirming your account.
						</h4>
					</Card.Text>
					<Link to='/login'>
						<Button className='styled-btn m-4' variant='primary' size='lg'>
							Go to login
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default RegistrationSuccessful;
