import { Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import WorkoutTitle from '././components/WorkoutTitle';
import WorkoutDuration from '././components/WorkoutDuration';
import WorkoutDescription from '././components/WorkoutDescription';
import WorkoutDatePicker from '././components/WorkoutDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const WorkoutAddForm = () => {
	return (
		<>
			<Container className='add-workout-container'>
				<Form className='add-workout-form '>
					<Row>
						<Col xs={1}>
							<Link to='/' className=' m-3 text-center'>
								<FontAwesomeIcon
									className='arrow-left-icon'
									icon={faArrowLeft}
									size='2x'
								/>
							</Link>
						</Col>
						<Col xs={10}>
							<h3 className='add-workout-title'>
								Form for adding a new workout
							</h3>
						</Col>
					</Row>
					<WorkoutTitle />
					<WorkoutDuration />
					<WorkoutDescription />
					<WorkoutDatePicker />
					<div className='text-center'>
						<Button variant='success' type='submit'>
							Submit
						</Button>
					</div>
				</Form>
			</Container>
		</>
	);
};

export default WorkoutAddForm;
