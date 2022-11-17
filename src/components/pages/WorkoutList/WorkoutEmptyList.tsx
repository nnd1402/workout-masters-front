import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const WorkoutEmptyList = () => {
	return (
		<Stack className='centered'>
			<h1 className='empty-list-title text-center'>
				Your Workout list is currently empty. Start your journey by adding your
				first workout!
			</h1>
			<div className='btn-container text-center'>
				<Link
					to='/add-workout'
					title='Add Workout'
					className='add-workout-button btn btn-danger'
				>
					<FontAwesomeIcon icon={faPlus} size='2xl' />
				</Link>
			</div>
		</Stack>
	);
};

export default WorkoutEmptyList;
