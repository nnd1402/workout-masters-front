import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const WorkoutBlockDeleteBtn = (props: any) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				variant='transparent'
				title='Delete Workout'
				className='trashcan-btn'
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
						variant='primary'
						onClick={() => props.deleteWorkout(props.workoutId)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default WorkoutBlockDeleteBtn;
