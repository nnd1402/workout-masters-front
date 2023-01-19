import { useState } from 'react';
import { Accordion, Row, Col, Card, Collapse } from 'react-bootstrap';
import parse from 'html-react-parser';
import WorkoutBlockAccordionButton from './block-components/WorkoutBlockAccordionButton';
import WorkoutBlockDatePicker from './block-components/WorkoutBlockDatePicker';
import WorkoutBlockTitleSelect from './block-components/WorkoutBlockTitleSelect';
import WorkoutBlockDeleteButton from './block-components/WorkoutBlockDeleteButton';
import WorkoutBlockEditButton from './block-components/WorkoutBlockEditButton';

type WorkoutBlockProps = {
	workoutDuration: number;
	workoutDescription: string;
	workoutId: string;
	workoutTitle: string;
	workoutDate: Date;
	deleteWorkout: (id: string) => void;
};

const WorkoutBlock = (props: WorkoutBlockProps) => {
	const [open, setOpen] = useState(false);

	const [startDate, setStartDate] = useState(new Date(props.workoutDate));

	function showDescription(): void {
		setOpen(!open);
	}

	function handleDateChange(date: Date): void {
		setStartDate(date);
	}

	const parsedWorkoutDescription = parse(props.workoutDescription);

	return (
		<>
			<Accordion defaultActiveKey='0'>
				<Card>
					<Card.Body className='card-header'>
						<Row>
							<Col className='duration-column'>
								<h3 className='h3-duration'>{props.workoutDuration} minutes</h3>
							</Col>
							<Col lg={4} className='header-column text-center'>
								<WorkoutBlockTitleSelect workoutTitle={props.workoutTitle} />
							</Col>
							<Col lg={4}>
								<WorkoutBlockDatePicker
									startDate={startDate}
									handleDateChange={handleDateChange}
								/>
							</Col>
							<Col
								lg={1}
								className='d-flex justify-content-center align-items-center'
							>
								<WorkoutBlockAccordionButton
									open={open}
									showDescription={showDescription}
								/>
							</Col>
						</Row>
					</Card.Body>
					<Collapse className='collapse-body' in={open}>
						<div>
							<Col md={12}>
								<div className='block-workout-description text-start'>
									{parsedWorkoutDescription}
								</div>
							</Col>
							<div className='text-end'>
								<WorkoutBlockEditButton workoutId={props.workoutId} />
								<WorkoutBlockDeleteButton
									deleteWorkout={props.deleteWorkout}
									workoutId={props.workoutId}
									workoutTitle={props.workoutTitle}
								/>
							</div>
						</div>
					</Collapse>
				</Card>
			</Accordion>
		</>
	);
};

export default WorkoutBlock;
