import { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Spinner,
	Alert
} from 'react-bootstrap';
import WorkoutFormTitle from './addForm-components/WorkoutFormTitle';
import WorkoutFormDuration from './addForm-components/WorkoutFormDuration';
import WorkoutFormDescription from './addForm-components/WorkoutFormDescription';
import WorkoutFormDatePicker from './addForm-components/WorkoutFormDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WorkoutAddForm = () => {
	const [workoutTitle, setWorkoutTitle] = useState('');
	const [workoutDuration, setWorkoutDuration] = useState('');
	const [workoutDescription, setWorkoutDescription] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list?showMessage=success');
	}

	function typeWorkoutTitle(e: any): void {
		setWorkoutTitle(e.target.value);
	}

	function selectWorkoutTitle(selectedOption: any): void {
		setWorkoutTitle(selectedOption.label);
	}

	function handleDurationChange(e: any): void {
		setWorkoutDuration(e.target.value);
	}

	function handleDateChange(date: Date): void {
		setStartDate(date);
	}

	function handleWorkoutDescriptionState(state: EditorState) {
		setEditorState(state);
		const stateToHtml = draftToHtml(convertToRaw(state.getCurrentContent()));
		setWorkoutDescription(stateToHtml);
	}

	const addWorkout = () => {
		setIsLoading(true);
		handleWorkoutDescriptionState(editorState);

		Axios.post('https://localhost:7116/api/Workout', {
			title: workoutTitle,
			duration: workoutDuration,
			description: workoutDescription,
			date: startDate
		})
			.then(() => {
				navigateToWorkoutListSuccess();
				setIsLoading(false);
			})
			.catch(() => {
				setShowingAlert(true);
				setErrorMessage(
					'There was a problem adding your workout. Please try again later.'
				);
				setIsLoading(false);
			});
	};

	return (
		<>
			<Container className='add-workout-container'>
				<Form className='add-workout-form'>
					<Row>
						<Col xs={1}>
							<Link to='/list' className='text-center'>
								<FontAwesomeIcon
									className='arrow-left-icon'
									icon={faArrowLeft}
									size='2x'
								/>
							</Link>
						</Col>
						<Col xs={10}>
							<h3 className='add-workout-title'>
								Form for adding a new workout
							</h3>
						</Col>
					</Row>
					<WorkoutFormTitle
						workoutTitle={workoutTitle}
						typeWorkoutTitle={typeWorkoutTitle}
						selectWorkoutTitle={selectWorkoutTitle}
					/>
					<WorkoutFormDuration
						workoutDuration={workoutDuration}
						handleDurationChange={handleDurationChange}
					/>

					<WorkoutFormDescription
						workoutDescription={workoutDescription}
						editorState={editorState}
						handleWorkoutDescriptionState={handleWorkoutDescriptionState}
					/>
					<WorkoutFormDatePicker
						startDate={startDate}
						handleDateChange={handleDateChange}
					/>
					<div className='text-center'>
						<Button variant='success' onClick={addWorkout} disabled={isLoading}>
							{isLoading ? (
								<Spinner animation='border' size='sm' />
							) : (
								'Add Workout'
							)}
						</Button>
					</div>
					<div
						className={`${
							isShowingAlert ? 'alert-shown' : 'alert-hidden'
						} 'alert-fail'`}
						onTransitionEnd={() =>
							setTimeout(() => {
								setShowingAlert(false);
							}, 5000)
						}
					>
						<Alert className='text-center mt-2' variant='danger'>
							{errorMessage}
						</Alert>
					</div>
				</Form>
			</Container>
		</>
	);
};

export default WorkoutAddForm;
