import { Button, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RegistrationSuccessful = () => {
	const navigateToList = useNavigate();

	useEffect(() => {
		const redirectToList = setTimeout(() => navigateToList('/list'), 5000);

		return () => {
			clearTimeout(redirectToList);
		};
	}, [navigateToList]);

	return (
		<Container className='card-container text-center'>
			<Card className='success-card'>
				<Card.Header className='success-card-header text-center'>
					<FontAwesomeIcon
						className='success-registration-icon'
						icon={faCircleCheck}
					/>
				</Card.Header>
				<Card.Body>
					<Card.Title>Registration Successful!</Card.Title>
					<Card.Text>Your account has been successfully created.</Card.Text>
					<Card.Text>
						Confirmation email has been sent and you will be redirected shortly.
					</Card.Text>
					<Link to='/login'>
						<Button variant='primary'>Back to login</Button>
					</Link>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default RegistrationSuccessful;
