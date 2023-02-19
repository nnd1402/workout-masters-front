import { useEffect, useState } from 'react';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import WorkoutListFilter from './WorkoutListFilter';
import Axios from 'axios';
import { AxiosResponse } from 'axios';
import authHeader from './../../../services/AuthHeader';
import WorkoutEmptyList from './WorkoutEmptyList';
import ReactPaginate from 'react-paginate';

const WorkoutList = () => {
	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	const [workoutList, setWorkoutList] = useState<Workout[]>([]);

	const [showAlert, setShowAlert] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');

	const [query, setQuery] = useState('');

	function handleFilterQuery(e: React.ChangeEvent<HTMLInputElement>): void {
		setQuery(e.target.value);
	}

	const [pageNumber, setPageNumber] = useState(0);

	const workoutsPerPage = 7;
	const pagesVisited = pageNumber * workoutsPerPage;

	// Extract type definition for workout object
	type Workout = {
		id: string;
		title: string;
		duration: number;
		description: string;
		date: Date;
	};

	const workouts = displayWorkouts(
		pagesVisited,
		workoutsPerPage,
		workoutList,
		query,
		deleteWorkout
	);

	// Define a function to filter workouts based on query string
	function filterWorkouts(workouts: Workout[], query: string): Workout[] {
		return workouts.filter((workout) => {
			const queryLower = query.toLowerCase();
			const titleLower = workout.title.toLowerCase();
			const descriptionLower = workout.description.toLowerCase();

			return (
				titleLower.includes(queryLower) ||
				workout.duration.toString().includes(query) ||
				descriptionLower.includes(queryLower)
			);
		});
	}

	// Define a function to map workouts to JSX elements
	function mapWorkoutsToElements(
		workouts: Workout[],
		deleteWorkout: (id: string) => void
	): JSX.Element[] {
		return workouts.map((workout) => (
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
		));
	}

	// Define the main function that fetches workouts and renders them
	function displayWorkouts(
		pagesVisited: number,
		workoutsPerPage: number,
		workoutList: Workout[],
		query: string,
		deleteWorkout: (id: string) => void
	): JSX.Element[] {
		const startIndex = pagesVisited;
		const endIndex = pagesVisited + workoutsPerPage;
		const workoutsToShow = workoutList.slice(startIndex, endIndex);
		const filteredWorkouts = filterWorkouts(workoutsToShow, query);
		const workoutElements = mapWorkoutsToElements(
			filteredWorkouts,
			deleteWorkout
		);

		return workoutElements;
	}

	const pageCount = Math.ceil(workoutList.length / workoutsPerPage);

	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

	const navigate = useNavigate();

	function navigateToWorkoutListSuccess() {
		navigate('/list?showMessage=deletedSuccess');
	}

	//Define a function to fetch the list of workouts
	function fetchWorkouts(): void {
		Axios.get<Workout[]>(
			`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/ListByUser`,
			{
				headers: authHeader()
			}
		).then((response: AxiosResponse<Workout[]>) => {
			setWorkoutList(response.data);
		});
	}

	//Define a function to delete the workout item
	function deleteWorkout(id: string): void {
		Axios.delete(
			`${process.env.REACT_APP_WORKOUT_BASE_URL}/Workout/Delete/${id}`,
			{
				headers: authHeader()
			}
		)
			.then(() => {
				const updatedWorkoutList = workoutList.filter(
					(workout) => workout.id !== id
				);
				setWorkoutList(updatedWorkoutList);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showMessage]);

	function renderEmptyWorkoutList() {
		if (workoutList.length === 0) {
			return <WorkoutEmptyList />;
		}

		return (
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
					<h3 className='workout-list-heading text-center'>Workout list</h3>
					<div className='mt-4'>
						<WorkoutListFilter
							query={query}
							handleFilterQuery={handleFilterQuery}
						/>
					</div>
					<ListGroup className='text-center text-lg-start'>
						{workouts}
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
					<div className='pagination-container text-center'>
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
		);
	}

	return <>{renderEmptyWorkoutList()}</>;
};

export default WorkoutList;
