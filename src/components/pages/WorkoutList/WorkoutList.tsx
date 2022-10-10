import { useState } from 'react';
import { useWorkouts } from './useWorkouts';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WorkoutListFilter from './WorkoutListFilter';

const WorkoutList = () => {
	const { workoutList, showAlert, deleteWorkout } = useWorkouts();

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
		</>
	);
};

export default WorkoutList;
