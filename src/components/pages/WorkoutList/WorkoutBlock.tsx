import { useEffect, useState } from 'react';
import {
	Form,
	Accordion,
	Row,
	Col,
	Card,
	Button,
	Collapse
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WorkoutDeleteBtn from './components/WorkoutDeleteBtn';
import Select from 'react-select';
import { options } from '../../WorkoutOptions';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

const WorkoutBlock = (props: any) => {
	const [workoutTitle, setWorkoutTitle] = useState(props.workoutTitle);

	const [open, setOpen] = useState(false);

	const [startDate, setStartDate] = useState(new Date(props.workoutDate));

	const [workoutDescription] = useState(props.workoutDescription);

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

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

	const customStyles = {
		placeholder: (provided: any) => ({
			...provided,
			color: 'black'
		}),
		control: (provided: any) => ({
			...provided,
			'&:hover': {
				borderColor: 'black'
			},

			padding: '5px',
			borderRadius: '20px'
		})
	};

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
								<Select
									styles={customStyles}
									placeholder={workoutTitle}
									defaultValue={workoutTitle}
									options={options}
									onChange={selectWorkoutTitle}
								/>
							</Col>
							<Col md={4}>
								<div className='text-end'>
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
								<Form.Text>
									<Editor
										editorState={editorState}
										onEditorStateChange={onEditorStateChange}
										wrapperClassName='wrapper-class'
										toolbarClassName='toolbar-class gap'
										editorClassName='editor-class'
									/>
								</Form.Text>
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
