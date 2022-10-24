import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { options } from '../../../WorkoutOptions';

const WorkoutEditFormTitle = (props: any) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='form-label'>Workout title</Form.Label>
			<Form.Control
				size='lg'
				type='text'
				placeholder='Enter the title of your workout'
				className='form-control'
				defaultValue={props.workoutTitle}
				onChange={props.typeWorkoutTitle}
			/>
			<Select
				placeholder='Choose your workout from predefined options'
				options={options}
				onChange={props.selectWorkoutTitle}
			/>
		</Form.Group>
	);
};

export default WorkoutEditFormTitle;
