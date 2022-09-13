import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RangeSlider from 'react-bootstrap-range-slider';

const AddWorkout = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [durationValue, setDurationValue] = useState('');
	const [workoutTitle, setWorkoutTitle] = useState('');

	function handleWorkoutTitles(e: any): void {
		setWorkoutTitle(e.target.value);
	}

	return (
		<>
			<Container className='add-workout-container'>
				<Form className='add-workout-form '>
					<h3 className='add-workout-title'>Form for adding a new workout</h3>
					<Form.Group className='mb-3 form-group'>
						<Form.Label className='add-workout-label'>Workout title</Form.Label>
						<Form.Control
							size='lg'
							type='text'
							placeholder='Enter the title of your workout'
							className='form-control'
							value={workoutTitle}
							onChange={(e) => setWorkoutTitle(e.target.value)}
						/>
						<Form.Select onChange={handleWorkoutTitles}>
							<option>Push</option>
							<option>Pull</option>
						</Form.Select>
					</Form.Group>

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
							onChange={(changeEvent) =>
								setDurationValue(changeEvent.target.value)
							}
							variant='success'
							step={15}
							min={15}
							max={90}
							tooltipLabel={(currentValue) => `${currentValue} minutes`}
						/>
					</Form.Group>
					<Form.Group className='mb-3 form-group'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							size='lg'
							as='textarea'
							rows={4}
							placeholder='What exercises did you do?'
						/>
					</Form.Group>
					<Form.Group className='mb-3 form-group'>
						<Form.Label className='add-workout-label'>Workout date</Form.Label>
						<DatePicker
							selected={startDate}
							onChange={(date: Date) => setStartDate(date)}
						/>
					</Form.Group>
					<div className='text-center'>
						<Button variant='success' type='submit'>
							Submit
						</Button>
						<Link to='/' className='btn btn-primary m-3 text-center'>
							To Workout List
						</Link>
					</div>
				</Form>
			</Container>
		</>
	);
};

export default AddWorkout;
