// import { useSearchParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const useWorkouts = () => {
// 	const [searchParams] = useSearchParams();
// 	const showMessage = searchParams.get('showMessage');

// 	const [workoutList, setWorkoutList] = useState([]);

// 	const [showAlert, setShowAlert] = useState(false);

// 	const navigate = useNavigate();

// 	function navigateToWorkoutListSuccess() {
// 		navigate('/list');
// 	}

// 	function fetchWorkouts(): void {
// 		Axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout`).then(
// 			(response) => {
// 				setWorkoutList(response.data);
// 			}
// 		);
// 	}

// 	function deleteWorkout(id: string): void {
// 		Axios.delete(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/${id}`)
// 			.then(() => {
// 				setWorkoutList(
// 					workoutList.filter((val: { id: string }) => {
// 						return val.id !== id;
// 					})
// 				);
// 				navigateToWorkoutListSuccess();
// 			})
// 			.catch(() => {
// 				console.log('delete failed');
// 			});
// 	}

// 	useEffect(() => {
// 		fetchWorkouts();
// 		function updateAlertMessage() {
// 			if (showMessage === 'success') {
// 				setShowAlert(true);
// 				setTimeout(() => {
// 					setShowAlert(false);
// 				}, 5000);
// 			}
// 		}
// 		updateAlertMessage();
// 	}, [showMessage]);

// 	return { workoutList, showAlert, deleteWorkout };
// };
