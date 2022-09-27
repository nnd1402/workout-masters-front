import Select from 'react-select';
import { options } from '../../../WorkoutOptions';

const WorkoutBlockTitleSelect = (props: any) => {
	const customStyles = {
		placeholder: (provided: any) => ({
			...provided,
			color: 'black'
		}),
		control: (provided: any) => ({
			...provided,
			'&:hover': {
				borderColor: 'black'
			},

			padding: '5px',
			borderRadius: '20px'
		})
	};
	return (
		<>
			<Select
				styles={customStyles}
				placeholder={props.workoutTitle}
				defaultValue={props.workoutTitle}
				options={options}
				onChange={props.selectWorkoutTitle}
			/>
		</>
	);
};

export default WorkoutBlockTitleSelect;
