import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const WorkoutBlockEditButton = () => {
	return (
		<>
			<Link to='/edit-workout' title='Edit Workout'>
				<Button variant='transparent' className='block-btn'>
					<FontAwesomeIcon className='trashcan-icon' icon={faPenToSquare} />
				</Button>
			</Link>
		</>
	);
};

export default WorkoutBlockEditButton;
