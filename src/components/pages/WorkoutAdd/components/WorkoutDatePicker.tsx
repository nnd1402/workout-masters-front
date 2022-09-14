import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutDatePicker = () => {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='add-workout-label'>Workout date</Form.Label>
			<DatePicker
				className='datepicker-square text-center'
				selected={startDate}
				onChange={(date: Date) => setStartDate(date)}
				dateFormat='eee/dd/MM/yyyy'
			/>
		</Form.Group>
	);
};

export default WorkoutDatePicker;
