import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WorkoutEditFormTitle from './editForm-components/WorkoutEditFormTitle';
import WorkoutEditFormDuration from './editForm-components/WorkoutEditFormDuration';
import WorkoutEditFormDescription from './editForm-components/WorkoutEditFormDescription';
import WorkoutEditFormDatePicker from './editForm-components/WorkoutEditFormDatePicker';

const WorkoutEditForm = () => {
	return (
		<>
			<Container className='add-workout-container'>
				<Form className='add-workout-form'>
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
							<h3 className='add-workout-title'>Edit the selected workout</h3>
						</Col>
					</Row>
					<WorkoutEditFormTitle />
					<WorkoutEditFormDuration />

					<WorkoutEditFormDescription />
					<WorkoutEditFormDatePicker />
					<div className='text-center'>
						<Button variant='success'>Edit Workout</Button>
					</div>
				</Form>
			</Container>
		</>
	);
};

export default WorkoutEditForm;
