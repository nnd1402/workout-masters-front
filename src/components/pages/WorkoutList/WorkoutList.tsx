import { useEffect, useState } from 'react';
import Axios from 'axios';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const WorkoutList = () => {
	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	const [workoutList, setWorkoutList] = useState([]);

	const [showAlert, setShowAlert] = useState(false);

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list');
	}

	useEffect(() => {
		function updateAlertMessage() {
			if (showMessage === 'success') {
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 5000);
			}
		}
		updateAlertMessage();
		getWorkouts();
	}, [showMessage]);

	const getWorkouts = () => {
		Axios.get('https://localhost:7116/api/Workout').then((response) => {
			setWorkoutList(response.data);
		});
	};

	function deleteWorkout(id: any) {
		Axios.delete(`https://localhost:7116/api/Workout/${id}`)

			.then((response: any) => {
				setWorkoutList(
					workoutList.filter((val: any) => {
						return val.id !== id;
					})
				);
				console.log(workoutList);
				navigateToWorkoutListSuccess();
			})
			.catch(() => {
				console.log('fail');
			});
	}

	return (
		<>
			<Alert
				className={`${
					showAlert ? 'alert-shown' : 'alert-hidden'
				} 'alert-fail' text-center`}
				variant='success'
			>
				You successfully added workout!
			</Alert>

			<ListGroup>
				{workoutList.map((workoutList: any, id) => {
					return (
						<ListGroupItem key={id}>
							<WorkoutBlock
								key={workoutList.id}
								workoutId={workoutList.id}
								workoutTitle={workoutList.title}
								workoutDuration={workoutList.duration}
								workoutDescription={workoutList.description}
								workoutDate={workoutList.date}
								deleteWorkout={deleteWorkout}
							/>
						</ListGroupItem>
					);
				})}
			</ListGroup>
			<div className='btn-container text-center'>
				<Link to='/add-workout' className='add-button btn btn-danger'>
					Add Workout
				</Link>
			</div>
		</>
	);
};

export default WorkoutList;
