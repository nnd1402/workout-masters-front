import { Form } from 'react-bootstrap';

type WorkoutBlockTitleSelectProps = {
	workoutTitle: string;
};

const WorkoutBlockTitleSelect = (props: WorkoutBlockTitleSelectProps) => {
	return (
		<>
			<Form.Text>
				<h2 className='title-list'>{props.workoutTitle}</h2>
			</Form.Text>
		</>
	);
};

export default WorkoutBlockTitleSelect;
