import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const WorkoutTitle = () => {
	const [workoutTitle, setWorkoutTitle] = useState('');

	function handleWorkoutTitle(e: any): void {
		setWorkoutTitle(e.target.value);
	}
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='add-workout-label'>Workout title</Form.Label>
			<Form.Control
				size='lg'
				type='text'
				placeholder='Enter the title of your workout'
				className='form-control'
				defaultValue={workoutTitle}
				onChange={handleWorkoutTitle}
			/>
			<Form.Select
				className='select-workout-title'
				onChange={handleWorkoutTitle}
			>
				<option disabled>Choose the title from the list of workouts</option>
				<option>Push</option>
				<option>Pull</option>
			</Form.Select>
		</Form.Group>
	);
};

export default WorkoutTitle;
