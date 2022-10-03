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
					<Card.Header className='card-header'>
						<Row>
							<Col md={3} className='header-column'>
								<h3 className='h3-duration'>{props.workoutDuration} minutes</h3>
							</Col>
							<Col md={4} className='header-column text-center'>
								<WorkoutBlockTitleSelect workoutTitle={props.workoutTitle} />
							</Col>
							<Col md={4}>
								<div className='text-end'>
									<WorkoutBlockDatePicker
										startDate={startDate}
										handleDateChange={handleDateChange}
									/>
								</div>
							</Col>
							<Col md={1} className='text-center'>
								<WorkoutBlockAccordionButton
									open={open}
									showDescription={showDescription}
								/>
							</Col>
						</Row>
					</Card.Header>
					<Collapse className='collapse-body' in={open}>
						<div>
							<Col md={12}>
								<div className='block-workout-description'>
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
