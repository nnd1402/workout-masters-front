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
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import authHeader from '../../../services/AuthHeader';

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
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	function navigateToWorkoutListSuccess() {
		navigate('/list?showMessage=editedSuccess');
	}

	function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setWorkoutDuration(e.target.value);
	}

	function handleDateChange(date: Date): void {
		setWorkoutDate(date);
	}

	function handleWorkoutDescriptionState(state: EditorState): void {
		setEditorState(state);
		convertEditorStateToHtml(state);
	}

	function convertEditorStateToHtml(state: EditorState): void {
		const stateToHtml = draftToHtml(convertToRaw(state.getCurrentContent()));
		setWorkoutDescription(stateToHtml);
	}

	function convertEditorStateToRawDraft(workoutDescription: any): void {
		const blocksFromHtml = htmlToDraft(workoutDescription);
		const { contentBlocks, entityMap } = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(
			contentBlocks,
			entityMap
		);
		const editorState = EditorState.createWithContent(contentState);
		setEditorState(editorState);
	}

	function setFieldsOnPageLoad() {
		if (workoutId) {
			Axios.get(
				`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/GetById/${workoutId}`,
				{ headers: authHeader() }
			)
				.then((response) => {
					setWorkoutTitle(response.data.title);
					setWorkoutDuration(response.data.duration);
					setWorkoutDescription(response.data.description);
					setWorkoutDate(parseISO(response.data.date));
					convertEditorStateToRawDraft(response.data.description);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	useEffect(() => {
		setFieldsOnPageLoad();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editWorkout = (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		Axios.put(
			`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/Update/${workoutId}`,
			{
				id: workoutId,
				title: workoutTitle,
				duration: workoutDuration,
				description: workoutDescription,
				date: workoutDate
			},
			{ headers: authHeader() }
		)
			.then(() => {
				navigateToWorkoutListSuccess();
				setIsLoading(false);
			})
			.catch((err) => {
				setShowingAlert(true);
				if (err.response.data === undefined) {
					setErrorMessage('Server is down, please try again later');
				} else {
					setErrorMessage(err.response.data.toString());
				}
				setIsLoading(false);
			});
	};

	function setTypedTitle(newValue: string): void {
		setWorkoutTitle(newValue);
	}

	return (
		<>
			<Container className='form-container'>
				<Form className='workout-form p-4 p-sm-3' onSubmit={editWorkout}>
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
							<h2 className='form-title'>Edit the selected workout</h2>
						</Col>
					</Row>
					<WorkoutEditFormTitle
						workoutTitle={workoutTitle}
						setTypedTitle={setTypedTitle}
					/>
					<WorkoutEditFormDuration
						workoutDuration={workoutDuration}
						handleDurationChange={handleDurationChange}
					/>

					<WorkoutEditFormDescription
						editorState={editorState}
						handleWorkoutDescriptionState={handleWorkoutDescriptionState}
						workoutDescription={workoutDescription}
					/>
					<WorkoutEditFormDatePicker
						workoutDate={workoutDate}
						handleDateChange={handleDateChange}
					/>
					<div className='text-center'>
						<Button
							className='edit-workout-btn'
							type='submit'
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
