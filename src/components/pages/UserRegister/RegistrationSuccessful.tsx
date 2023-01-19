import { Card, Container } from 'react-bootstrap';
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
					<div>
						<h3>Your account has been successfully created.</h3>
					</div>
					<div>
						<p>
							Confirmation email has been sent to your email address. Check your
							spam if you don't see it in your inbox and also move it out of
							spam if it is there. Please login after confirming your account.
						</p>
					</div>
					<Link className='link mt-4' to='/login'>
						Go to login
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default RegistrationSuccessful;
