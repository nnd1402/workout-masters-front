import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CreatableSelect from 'react-select/creatable';
import { options } from './../../../WorkoutOptions';

type WorkoutFormTitleProps = {
	workoutTitle: string;
	setTypedTitle: (newValue: string) => void;
};

interface IProps {
	data: {};
	isDisabled: boolean;
	isSelected: boolean;
	isFocused: boolean;
}

interface IStyles {}

interface Option {
	readonly label: string;
	readonly value: string;
}

const WorkoutFormTitle = (props: WorkoutFormTitleProps) => {
	const [value, setValue] = useState<Option | null>();

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

	function handleTitleChange(inputTitleValue: any) {
		setValue(inputTitleValue);
		props.setTypedTitle(inputTitleValue.label);
	}

	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='add-workout-label'>Title</Form.Label>
			<CreatableSelect
				isClearable
				placeholder='Choose your workout from predefined options or write your own title'
				options={options}
				onChange={(param) => handleTitleChange(param)}
				styles={colorStyles}
				value={value}
			/>
		</Form.Group>
	);
};

export default WorkoutFormTitle;
