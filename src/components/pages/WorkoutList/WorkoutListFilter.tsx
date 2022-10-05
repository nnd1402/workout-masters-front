import Form from 'react-bootstrap/Form';

type WorkoutListFilterProps = {
	query: string;
	handleFilterQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WorkoutListFilter = (props: WorkoutListFilterProps) => {
	return (
		<Form className='filter-wrapper'>
			<Form.Control
				type='text'
				placeholder='Filter displayed workouts, eg. "Pull'
				id='filter-control'
				onChange={props.handleFilterQuery}
			/>
		</Form>
	);
};

export default WorkoutListFilter;
