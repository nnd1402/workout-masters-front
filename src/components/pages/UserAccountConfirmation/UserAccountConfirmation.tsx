import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import {
	faCircleCheck,
	faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserAccountConfirmation = () => {
	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();

	const email = query.get('Email');
	const token = query.get('token');

	const navigate = useNavigate();

	const [isConfirmed, setIsConfirmed] = useState(false);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/ConfirmEmail`, {
				params: { Email: email, token: token }
			})
			.then(() => {
				setIsConfirmed(true);
			})
			.catch(() => {
				setIsConfirmed(false);
			});

		//const redirectToLogin = setTimeout(() => navigate('/login'), 5000);

		return () => {
			//clearTimeout(redirectToLogin);
		};
	}, [email, token, navigate]);

	return (
		<div>
			{isConfirmed ? (
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
								<h1>Account confirmation successful!</h1>
							</Card.Title>
							<Card.Text>
								<h4>
									Your account has been successfully verified. You can now log
									in.
								</h4>
							</Card.Text>
							<Link to='/login'>
								<Link className='link mt-4' to='/login'>
									Go to login
								</Link>
							</Link>
						</Card.Body>
					</Card>
				</Container>
			) : (
				<Container className='card-container text-center'>
					<Card className='fail-card'>
						<Card.Header className='fail-card-header text-center'>
							<FontAwesomeIcon
								className='fail-registration-icon'
								icon={faCircleExclamation}
							/>
						</Card.Header>
						<Card.Body className='success-card-body'>
							<Card.Title>
								<h1>Account confirmation failed!</h1>
							</Card.Title>
							<Card.Text>
								<h5>Your account has not been successfully verified.</h5>
							</Card.Text>
							<Card.Text>
								<p>Please send a request for the new confirmation email.</p>
							</Card.Text>
							<Link className='link mt-4' to='/request-confirmation-email'>
								Send request
							</Link>
						</Card.Body>
					</Card>
				</Container>
			)}
		</div>
	);
};

export default UserAccountConfirmation;
