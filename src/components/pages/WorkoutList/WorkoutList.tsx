import { useEffect, useState } from 'react';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import WorkoutListFilter from './WorkoutListFilter';
import Axios from 'axios';
import authHeader from './../../../services/AuthHeader';
import AuthService from '../../../services/AuthService';

const WorkoutList = () => {
	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	const [workoutList, setWorkoutList] = useState([]);

	const [showAlert, setShowAlert] = useState(false);

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list');
	}

	function handleLogout() {
		AuthService.logout();
		navigateToWorkoutListSuccess();
	}

	function fetchWorkouts(): void {
		Axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout`, {
			headers: authHeader()
		}).then((response) => {
			setWorkoutList(response.data);
		});
	}

	function deleteWorkout(id: string): void {
		Axios.delete(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/${id}`, {
			headers: authHeader()
		})
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
			if (showMessage === 'success') {
				setShowAlert(true);
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
			<Alert
				className={`${
					showAlert ? 'alert-shown' : 'alert-hidden'
				} 'alert-fail' text-center`}
				variant='success'
			>
				Workout added successfully!
			</Alert>
			<WorkoutListFilter query={query} handleFilterQuery={handleFilterQuery} />
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
			<div className='btn-container text-center'>
				<Link to='/add-workout' className='add-button btn btn-danger'>
					Add Workout
				</Link>
			</div>
			<Link to='/register' className='add-button btn btn-danger'>
				Register
			</Link>
			<Link to='/login' className='add-button btn btn-danger'>
				Login
			</Link>
			<Button onClick={handleLogout}>Logout</Button>
		</>
	);
};

export default WorkoutList;
