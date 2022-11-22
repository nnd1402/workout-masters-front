import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import {
	faCircleCheck,
	faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserAccountConfirmation = () => {
	//const { email, token } = useParams<{ email?: string; token?: string }>();
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
			.then((response) => {
				console.log(response.data);
				setIsConfirmed(true);
			})
			.catch(() => {
				console.log(email, token);
				setIsConfirmed(false);
			});
		console.log('ovo je email:' + email, 'ovo je token:' + token);

		const redirectToLogin = setTimeout(() => navigate('/login'), 5000);

		return () => {
			clearTimeout(redirectToLogin);
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
						<Card.Body>
							<Card.Title>Confirmation Successful!</Card.Title>
							<Card.Text>
								Your account has been successfully verified.
							</Card.Text>
							<Link to='/login'>
								<Button className='styled-btn mt-4' variant='primary'>
									Go to login
								</Button>
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
						<Card.Body>
							<Card.Title>Confirmation Failed!</Card.Title>
							<Card.Text>
								Your account has not been successfully verified.
							</Card.Text>
							<Link to='/login'>
								<Button className='styled-btn mt-4' variant='primary'>
									Go to login
								</Button>
							</Link>
						</Card.Body>
					</Card>
				</Container>
			)}
		</div>
	);
};

export default UserAccountConfirmation;