import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
	startDate: Date;
	handleDateChange: (date: Date) => void;
};

const WorkoutBlockDatePicker = (props: DatePickerProps) => {
	return (
		<div>
			<DatePicker
				className='datepicker-rounded text-center'
				selected={props.startDate}
				onChange={props.handleDateChange}
				showTimeSelect
				dateFormat='eee/dd/MM/yyyy HH:mm:ss'
				disabled
			/>
		</div>
	);
};

export default WorkoutBlockDatePicker;
