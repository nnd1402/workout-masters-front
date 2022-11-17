import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CreatableSelect from 'react-select/creatable';

type WorkoutFormTitleProps = {
	workoutTitle: string;
	typeWorkoutTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectWorkoutTitle: (selectedOption: { label: string }) => void;
};

interface IProps {
	data: any;
	isDisabled: boolean;
	isSelected: boolean;
	isFocused: boolean;
}

interface IStyles {}

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (label: string) => ({
	label,
	value: label.toLowerCase().replace(/\W/g, '')
});

const defaultOptions = [
	createOption('Push Training'),
	createOption('Pull Training'),
	createOption('Arms Training'),
	createOption('Legs Training'),
	createOption('Calisthenics'),
	createOption('Crossfit')
];

const WorkoutEditFormTitle = (props: WorkoutFormTitleProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState(defaultOptions);
	const [value, setValue] = useState<Option | null>();

	const handleCreate = (inputValue: string) => {
		setIsLoading(true);
		setTimeout(() => {
			const newOption = createOption(inputValue);
			setIsLoading(false);
			setOptions((prev) => [...prev, newOption]);
			setValue(newOption);
		}, 1000);
	};

	const colorStyles = {
		control: (styles: IStyles, state: any) => ({
			...styles,
			backgroundColor: '#fff',
			color: '#000000 !important',
			boxShadow: 'none',
			border: state.isFocused ? 'none' : '2px solid #fff'
		}),
		option: (
			styles: IStyles,
			{ data, isDisabled, isFocused, isSelected }: IProps
		) => {
			return {
				...styles,
				color: isFocused ? '#fff' : '#121212',
				backgroundColor: isFocused ? '#272727' : '#fff',
				cursor: 'pointer'
			};
		}
	};

	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='form-label'>Workout title</Form.Label>
			{/* <Form.Control
				size='lg'
				type='text'
				placeholder='Enter the title of your workout'
				className='form-control'
				defaultValue={props.workoutTitle}
				onChange={props.typeWorkoutTitle}
			/> */}
			<CreatableSelect
				name={props.workoutTitle}
				placeholder='Choose your workout from predefined options or write your own title'
				options={options}
				onCreateOption={handleCreate}
				onChange={props.selectWorkoutTitle}
				styles={colorStyles}
			/>
		</Form.Group>
	);
};

export default WorkoutEditFormTitle;
