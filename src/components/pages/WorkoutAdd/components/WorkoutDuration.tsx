import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const WorkoutDuration = () => {
	const [durationValue, setDurationValue] = useState('');

	return (
		<Form.Group className='mb-3 form-group' as={Row}>
			<Form.Label className='add-workout-label'>Duration</Form.Label>
			<Col xs='6'>
				<Form.Control
					className='duration-control'
					type='text'
					placeholder='Enter the duration of your workout'
					value={durationValue}
					onChange={(e) => setDurationValue(e.target.value)}
				/>
			</Col>
			<Col xs='6'>
				<p className='minutes'>min</p>
			</Col>

			<RangeSlider
				value={durationValue}
				onChange={(changeEvent) => setDurationValue(changeEvent.target.value)}
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
