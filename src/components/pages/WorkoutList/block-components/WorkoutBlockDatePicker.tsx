import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlockDatePicker = (props: any) => {
	return (
		<div className='text-end'>
			<DatePicker
				className='datepicker-rounded text-center'
				selected={props.startDate}
				onChange={props.handleDateChange}
				showTimeSelect
				dateFormat='eee/dd/MM/yyyy HH:mm:ss'
			/>
		</div>
	);
};

export default WorkoutBlockDatePicker;
