import { useEffect, useState } from 'react';
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Spinner,
	Alert
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WorkoutEditFormTitle from './editForm-components/WorkoutEditFormTitle';
import WorkoutEditFormDuration from './editForm-components/WorkoutEditFormDuration';
import WorkoutEditFormDescription from './editForm-components/WorkoutEditFormDescription';
import WorkoutEditFormDatePicker from './editForm-components/WorkoutEditFormDatePicker';
import Axios from 'axios';
import { parseISO } from 'date-fns';
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromRaw
} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const WorkoutEditForm = () => {
	let { workoutId } = useParams();
	const navigate = useNavigate();

	const [workoutTitle, setWorkoutTitle] = useState('');
	const [workoutDescription, setWorkoutDescription] = useState('');
	const [workoutDuration, setWorkoutDuration] = useState('');
	const [workoutDate, setWorkoutDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isShowingAlert, setShowingAlert] = useState(false);

	function navigateToWorkoutListSuccess() {
		navigate('/list?showMessage=success');
	}

	function typeWorkoutTitle(e: React.ChangeEvent<HTMLInputElement>): void {
		setWorkoutTitle(e.target.value);
	}

	function selectWorkoutTitle(selectedOption: { label: string }): void {
		setWorkoutTitle(selectedOption.label);
	}

	function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setWorkoutDuration(e.target.value);
	}

	function handleDateChange(date: Date): void {
		setWorkoutDate(date);
	}

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const htmlToDraftBlocks = (html: string) => {
		const blocksFromHtml = htmlToDraft(html);
		const { contentBlocks, entityMap } = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(
			contentBlocks,
			entityMap
		);
		const editorState = EditorState.createWithContent(contentState);
		return editorState;
	};

	function handleWorkoutDescriptionState(state: EditorState): void {
		setEditorState(state);
		const stateToHtml = draftToHtml(convertToRaw(state.getCurrentContent()));
		setWorkoutDescription(stateToHtml);
	}

	function onEditorStateChange(editorState: EditorState) {
		setEditorState(editorState);
	}

	useEffect(() => {
		if (workoutId) {
			Axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/${workoutId}`)
				.then((response) => {
					setWorkoutTitle(response.data.title);
					setWorkoutDuration(response.data.duration);
					setWorkoutDescription(response.data.description);
					setWorkoutDate(parseISO(response.data.date));
					setEditorState(htmlToDraftBlocks(workoutDescription));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [workoutId]);

	const editWorkout = () => {
		setIsLoading(true);
		handleWorkoutDescriptionState(editorState);

		Axios.put(`${process.env.REACT_APP_WORKOUT_BASE_URL}/${workoutId}`, {
			id: workoutId,
			title: workoutTitle,
			duration: workoutDuration,
			description: workoutDescription,
			date: workoutDate
		})
			.then(() => {
				navigateToWorkoutListSuccess();
				setIsLoading(false);
			})
			.catch(() => {
				setShowingAlert(true);
				setErrorMessage(
					'There was a problem while editing your workout. Please try again later.'
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
							<h3 className='add-workout-title'>Edit the selected workout</h3>
						</Col>
					</Row>
					<WorkoutEditFormTitle
						workoutTitle={workoutTitle}
						typeWorkoutTitle={typeWorkoutTitle}
						selectWorkoutTitle={selectWorkoutTitle}
					/>
					<WorkoutEditFormDuration
						workoutDuration={workoutDuration}
						handleDurationChange={handleDurationChange}
					/>

					<WorkoutEditFormDescription
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						handleWorkoutDescriptionState={handleWorkoutDescriptionState}
					/>
					<WorkoutEditFormDatePicker
						workoutDate={workoutDate}
						handleDateChange={handleDateChange}
					/>
					<div className='text-center'>
						<Button
							variant='success'
							onClick={editWorkout}
							disabled={isLoading}
						>
							{isLoading ? (
								<Spinner animation='border' size='sm' />
							) : (
								'Edit Workout'
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

export default WorkoutEditForm;
