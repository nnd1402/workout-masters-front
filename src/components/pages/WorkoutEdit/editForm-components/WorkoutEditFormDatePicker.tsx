import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type WorkoutFormDatePickerProps = {
	workoutDate: Date;
	handleDateChange: (date: Date) => void;
};

const WorkoutEditFormDatePicker = (props: WorkoutFormDatePickerProps) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='add-workout-label'>Workout date</Form.Label>
			<DatePicker
				className='datepicker-square text-center'
				selected={props.workoutDate}
				onChange={props.handleDateChange}
				showTimeSelect
				dateFormat='eee/dd/MM/yyyy HH:mm:ss'
			/>
		</Form.Group>
	);
};

export default WorkoutEditFormDatePicker;
