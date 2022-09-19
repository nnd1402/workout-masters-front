import Form from 'react-bootstrap/Form';

const WorkoutTitle = (props: any) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='add-workout-label'>Workout title</Form.Label>
			<Form.Control
				size='lg'
				type='text'
				placeholder='Enter the title of your workout'
				className='form-control'
				defaultValue={props.workoutTitle}
				onChange={props.handleWorkoutTitle}
			/>
			<Form.Select
				className='select-workout-title'
				onChange={props.handleWorkoutTitle}
			>
				<option disabled>Choose the title from the list of workouts</option>
				<option>Push</option>
				<option>Pull</option>
			</Form.Select>
		</Form.Group>
	);
};

export default WorkoutTitle;
