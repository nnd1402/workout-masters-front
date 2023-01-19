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
import ReactPaginate from 'react-paginate';

const WorkoutList = () => {
	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	const [workoutList, setWorkoutList] = useState([]);

	const [showAlert, setShowAlert] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');

	const [query, setQuery] = useState('');

	function handleFilterQuery(e: React.ChangeEvent<HTMLInputElement>): void {
		setQuery(e.target.value);
	}

	const [pageNumber, setPageNumber] = useState(0);

	const workoutsPerPage = 7;
	const pagesVisited = pageNumber * workoutsPerPage;

	const displayWorkouts = workoutList
		.slice(pagesVisited, pagesVisited + workoutsPerPage)
		.filter(
			(workout: { title: string; duration: number; description: string }) =>
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
		);

	const pageCount = Math.ceil(workoutList.length / workoutsPerPage);

	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

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

	return (
		<>
			{workoutList.length === 0 ? (
				<WorkoutEmptyList />
			) : (
				<Container className='workout-list-container'>
					<div className='workout-list'>
						<div className='alert-wrapper text-center m-2'>
							<Alert
								className={`${
									showAlert ? 'list-alert-shown' : 'list-alert-hidden'
								} `}
								variant='success'
							>
								{alertMessage}
							</Alert>
						</div>
						<h1 className='workout-list-heading text-center'>Workout list</h1>
						<div className='mt-4'>
							<WorkoutListFilter
								query={query}
								handleFilterQuery={handleFilterQuery}
							/>
						</div>
						<ListGroup className='text-center text-lg-start'>
							{displayWorkouts}
						</ListGroup>
						<div className='btn-container text-lg-end text-center'>
							<Link
								to='/add-workout'
								title='Add Workout'
								className='add-workout-button btn'
							>
								<FontAwesomeIcon icon={faPlus} size='2xl' />
							</Link>
						</div>
						<div className='text-center'>
							<ReactPaginate
								previousLabel={'Previous'}
								nextLabel={'Next'}
								pageCount={pageCount}
								onPageChange={changePage}
								containerClassName={'paginationButtons'}
								previousLinkClassName={'previousBtn'}
								nextLinkClassName={'nextBtn'}
								disabledClassName={'paginationDisabled'}
								activeClassName={'paginationActive'}
							/>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default WorkoutList;
