import { useEffect, useState } from 'react';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import WorkoutListFilter from './WorkoutListFilter';
import Axios from 'axios';
import authHeader from './../../../services/AuthHeader';
import WorkoutEmptyList from './WorkoutEmptyList';

const WorkoutList = () => {
	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	const [workoutList, setWorkoutList] = useState([]);

	const [showAlert, setShowAlert] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list?showMessage=deletedSuccess');
	}

	function fetchWorkouts(): void {
		Axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/ListByUser`, {
			headers: authHeader()
		}).then((response) => {
			setWorkoutList(response.data);
		});
	}

	function deleteWorkout(id: string): void {
		Axios.delete(
			`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/Delete/${id}`,
			{
				headers: authHeader()
			}
		)
			.then(() => {
				setWorkoutList(
					workoutList.filter((val: { id: string }) => {
						return val.id !== id;
					})
				);
				navigateToWorkoutListSuccess();
			})
			.catch(() => {
				console.log('delete failed');
			});
	}

	useEffect(() => {
		fetchWorkouts();
		function updateAlertMessage() {
			if (showMessage === 'addedSuccess') {
				setShowAlert(true);
				setAlertMessage('Workout added successfully!');
				setTimeout(() => {
					setShowAlert(false);
				}, 5000);
			} else if (showMessage === 'editedSuccess') {
				setShowAlert(true);
				setAlertMessage('Workout edited successfully!');
				setTimeout(() => {
					setShowAlert(false);
				}, 5000);
			} else if (showMessage === 'deletedSuccess') {
				setShowAlert(true);
				setAlertMessage('Workout deleted successfully!');
				setTimeout(() => {
					setShowAlert(false);
				}, 5000);
			}
		}
		updateAlertMessage();
	}, [showMessage]);

	const [query, setQuery] = useState('');

	function handleFilterQuery(e: React.ChangeEvent<HTMLInputElement>): void {
		setQuery(e.target.value);
	}

	return (
		<>
			{workoutList.length === 0 ? (
				<WorkoutEmptyList />
			) : (
				<Container>
					<h1 className='workout-list-heading text-center'>Workout list</h1>
					<div className='alert-wrapper text-center'>
						<Alert
							className={`${
								showAlert ? 'list-alert-shown' : 'list-alert-hidden'
							} `}
							variant='success'
						>
							{alertMessage}
						</Alert>
					</div>
					<div>
						<WorkoutListFilter
							query={query}
							handleFilterQuery={handleFilterQuery}
						/>
					</div>
					<ListGroup>
						{workoutList
							.filter(
								(workout: {
									title: string;
									duration: number;
									description: string;
								}) =>
									workout.title.toLowerCase().includes(query) ||
									workout.duration.toString().includes(query) ||
									workout.description.toLowerCase().includes(query)
							)
							.map(
								(workout: {
									id: string;
									title: string;
									duration: number;
									description: string;
									date: Date;
								}) => {
									return (
										<ListGroupItem key={workout.id}>
											<WorkoutBlock
												workoutId={workout.id}
												workoutTitle={workout.title}
												workoutDuration={workout.duration}
												workoutDescription={workout.description}
												workoutDate={workout.date}
												deleteWorkout={deleteWorkout}
											/>
										</ListGroupItem>
									);
								}
							)}
					</ListGroup>
					<div className='btn-container text-end'>
						<Link
							to='/add-workout'
							title='Add Workout'
							className='add-workout-button btn'
						>
							<FontAwesomeIcon icon={faPlus} size='2xl' />
						</Link>
					</div>
				</Container>
			)}
		</>
	);
};

export default WorkoutList;
