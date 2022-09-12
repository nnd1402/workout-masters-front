import { useState } from 'react';
import { Accordion, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlock = (props: any) => {
	const workouts = [{ title: 'Push' }, { title: 'Pull' }, { title: 'Leg' }];

	const [workout, setWorkout] = useState();

	const handleWorkoutChange = (e: any) => {
		setWorkout(e.target.value);
	};

	function disable(e: any) {
		e.stopPropagation();
		e.preventDefault();
	}

	return (
		<div>
			<Accordion>
				<Accordion.Item eventKey='0'>
					<Accordion.Header className='accordion-header'>
						<Col lg='2' className='header-column '>
							<h3>{props.workoutDuration}</h3>
						</Col>
						<Col className='header-column text-center'>
							<select
								className='workout-select text-center'
								onChange={handleWorkoutChange}
								onClick={disable}
							>
								<option>Select a workout</option>
								{workouts.map((workout) => (
									<option key={workout.title}>{workout.title}</option>
								))}
							</select>
						</Col>
						<Col xs lg='2'>
							<div onClick={disable}>
								<DatePicker
									className='datepicker text-center'
									selected={props.workoutDate}
									onChange={(date: Date) =>
										props.setStartDate(props.workoutIndex, date)
									}
									dateFormat='eee/dd/MM/yyyy'
								/>
							</div>
						</Col>
					</Accordion.Header>
					<Accordion.Body>
						<p>{props.workoutDescription}</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};

export default WorkoutBlock;
