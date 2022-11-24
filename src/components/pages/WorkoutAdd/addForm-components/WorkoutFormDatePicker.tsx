import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type WorkoutFormDatePickerProps = {
	startDate: Date;
	handleDateChange: (date: Date) => void;
};

const WorkoutFormDatePicker = (props: WorkoutFormDatePickerProps) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='form-label'>Date</Form.Label>
			<DatePicker
				className='datepicker-square text-center'
				selected={props.startDate}
				onChange={props.handleDateChange}
				showTimeSelect
				dateFormat='eee/dd/MM/yyyy HH:mm:ss'
			/>
		</Form.Group>
	);
};

export default WorkoutFormDatePicker;
