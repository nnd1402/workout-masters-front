import { useState } from 'react';
import { Accordion, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlock = (props: any) => {
	const workouts = [{ title: 'Push' }, { title: 'Pull' }, { title: 'Leg' }];

	const [workout, setWorkout] = useState(props.workoutTitle);

	const [startDate, setStartDate] = useState(new Date(props.workoutDate));

	const handleWorkoutChange = (e: any) => {
		setWorkout(e.target.value);
	};

	function disablePropagation(e: any) {
		e.stopPropagation();
	}

	return (
		<>
			<Accordion>
				<Accordion.Item eventKey='0'>
					<Accordion.Header className='accordion-header'>
						<Col className='header-column '>
							<h3>{props.workoutDuration} minutes</h3>
						</Col>
						<Col className='header-column text-center'>
							<select
								className='workout-select text-center'
								onChange={handleWorkoutChange}
								onClick={disablePropagation}
							>
								<option>{workout}</option>
								{workouts.map((workout) => (
									<option key={workout.title}>{workout.title}</option>
								))}
							</select>
						</Col>
						<Col>
							<div className='text-center' onClick={disablePropagation}>
								<DatePicker
									className='datepicker text-center'
									selected={startDate}
									onChange={(date: Date) => setStartDate(date)}
									showTimeSelect
									dateFormat='eee/dd/MM/yyyy HH:mm:ss'
								/>
							</div>
						</Col>
					</Accordion.Header>

					<Accordion.Body>
						<p>{props.workoutDescription}</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
};

export default WorkoutBlock;
