import { useState } from 'react';
import { Accordion, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WorkoutDeleteBtn from './components/WorkoutDeleteBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

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

	const [open, setOpen] = useState(false);

	return (
		<>
			<Accordion defaultActiveKey='0'>
				<Card>
					<Card.Header className='card-header'>
						<Row>
							<Col md={3} className='header-column'>
								<h3 className='h3-duration'>{props.workoutDuration} minutes</h3>
							</Col>
							<Col md={4} className='header-column text-center'>
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
							<Col md={4}>
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
							<Col md={1} className='text-center'>
								<Button
									className={`${
										open ? 'accordion-button' : 'accordion-button collapsed'
									}`}
									variant='transparent'
									onClick={() => setOpen(!open)}
									aria-controls='example-collapse-text'
									aria-expanded={open}
								></Button>
							</Col>
						</Row>
					</Card.Header>
					<Collapse className='collapse-body' in={open}>
						<Row>
							<Col md={11}>
								<p>{props.workoutDescription}</p>
							</Col>
							<Col md={1}>
								<WorkoutDeleteBtn
									deleteWorkout={props.deleteWorkout}
									workoutId={props.workoutId}
									workoutTitle={props.workoutTitle}
								/>
							</Col>
						</Row>
					</Collapse>
				</Card>
			</Accordion>
		</>
	);
};

export default WorkoutBlock;
