import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserResetPasswordSuccess = () => {
	return (
		<Container className='card-container text-center'>
			<Card className='success-card'>
				<Card.Body className='success-card-body'>
					<Card.Title>
						<h1>Your password has been changed</h1>
					</Card.Title>
					<p>
						You can now safely log in to your account with your new password
					</p>
					<Link className='link mt-4' to='/login'>
						Go to login
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default UserResetPasswordSuccess;
