import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserRequestPasswordResetSuccess = () => {
	return (
		<Container className='card-container text-center'>
			<Card className='success-card'>
				<Card.Body className='success-card-body'>
					<Card.Title>
						<h1>Almost there</h1>
					</Card.Title>
					<p>
						The link for reseting your password has been sent to your email
						address.
					</p>
					<p>You remembered your password in the meantime?</p>
					<Link className='link mt-4' to='/login'>
						Go to login
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default UserRequestPasswordResetSuccess;
