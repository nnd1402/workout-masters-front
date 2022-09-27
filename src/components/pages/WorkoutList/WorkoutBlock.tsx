import { useEffect, useState } from 'react';
import { Accordion, Row, Col, Card, Collapse } from 'react-bootstrap';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import WorkoutBlockDescription from './block-components/WorkoutBlockDescription';
import WorkoutBlockAccordionButton from './block-components/WorkoutBlockAccordionButton';
import WorkoutBlockDatePicker from './block-components/WorkoutBlockDatePicker';
import WorkoutBlockTitleSelect from './block-components/WorkoutBlockTitleSelect';
import WorkoutBlockDeleteBtn from './block-components/WorkoutBlockDeleteBtn';

const WorkoutBlock = (props: any) => {
	const [workoutTitle, setWorkoutTitle] = useState(props.workoutTitle);

	const [open, setOpen] = useState(false);

	const [startDate, setStartDate] = useState(new Date(props.workoutDate));

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const workoutDescription = props.workoutDescription;

	const contentBlock = htmlToDraft(workoutDescription);

	useEffect(() => {
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(
				contentBlock.contentBlocks
			);
			const editorState = EditorState.createWithContent(contentState);
			setEditorState(editorState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
	};

	function selectWorkoutTitle(selectedOption: any): void {
		setWorkoutTitle(selectedOption.label);
	}

	function showDescription() {
		setOpen(!open);
	}

	function handleDateChange(date: Date): void {
		setStartDate(date);
	}

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
								<WorkoutBlockTitleSelect
									workoutTitle={workoutTitle}
									selectWorkoutTitle={selectWorkoutTitle}
								/>
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
						<Row>
							<Col md={11}>
								<WorkoutBlockDescription
									editorState={editorState}
									onEditorStateChange={onEditorStateChange}
								/>
							</Col>
							<Col md={1}>
								<WorkoutBlockDeleteBtn
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
