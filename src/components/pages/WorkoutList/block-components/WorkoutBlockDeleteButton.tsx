import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type WorkoutBlockDeleteButtonProps = {
	workoutTitle: string;
	workoutId: string;
	deleteWorkout: (id: string) => void;
};

const WorkoutBlockDeleteButton = (props: WorkoutBlockDeleteButtonProps) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				variant='transparent'
				title='Delete Workout'
				className='description-btn'
				onClick={handleShow}
			>
				<FontAwesomeIcon className='trashcan-icon' icon={faTrash} />
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Workout?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete {props.workoutTitle}?"
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						className='styled-btn'
						onClick={() => props.deleteWorkout(props.workoutId)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default WorkoutBlockDeleteButton;
