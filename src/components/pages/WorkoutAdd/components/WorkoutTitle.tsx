import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const WorkoutTitle = () => {
	const [workoutTitle, setWorkoutTitle] = useState('');

	function handleWorkoutTitles(e: any): void {
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
				value={workoutTitle}
				onChange={(e) => setWorkoutTitle(e.target.value)}
			/>
			<Form.Select
				className='select-workout-title'
				onChange={handleWorkoutTitles}
			>
				<option disabled selected>
					Choose the title from the list of workouts
				</option>
				<option>Push</option>
				<option>Pull</option>
			</Form.Select>
		</Form.Group>
	);
};

export default WorkoutTitle;
