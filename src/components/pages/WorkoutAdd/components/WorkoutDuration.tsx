import { Form, Row, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const WorkoutDuration = (props: any) => {
	return (
		<Form.Group className='mb-3 form-group' as={Row}>
			<Form.Label className='add-workout-label'>Duration</Form.Label>
			<Col xs='6'>
				<Form.Control
					className='duration-control'
					type='number'
					placeholder='Enter the duration of your workout'
					value={props.workoutDuration}
					onChange={props.handleDurationChange}
					onKeyPress={(e) => {
						if (!/[0-9]/.test(e.key)) {
							e.preventDefault();
						}
					}}
				/>
			</Col>
			<Col xs='6'>
				<p className='minutes'>min</p>
			</Col>

			<RangeSlider
				value={props.workoutDuration}
				onChange={props.handleDurationChange}
				variant='success'
				step={15}
				min={15}
				max={90}
				tooltipLabel={(currentValue) => `${currentValue} minutes`}
			/>
		</Form.Group>
	);
};

export default WorkoutDuration;
