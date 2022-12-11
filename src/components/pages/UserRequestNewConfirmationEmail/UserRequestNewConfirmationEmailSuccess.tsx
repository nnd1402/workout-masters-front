import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserRequestNewConfirmationEmailSuccess = () => {
	return (
		<Container className='card-container text-center'>
			<Card className='success-card'>
				<Card.Body className='success-card-body'>
					<Card.Title>
						<h1>Email has been sent</h1>
					</Card.Title>
					<p>
						Confirmation email has been sent successfully, please verify your
						account before logging in!
					</p>
					<Link className='link mt-4' to='/login'>
						Go to login
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default UserRequestNewConfirmationEmailSuccess;
