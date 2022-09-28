import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useWorkouts } from './useWorkouts';

const WorkoutList = () => {
	const { workoutList, showAlert, deleteWorkout } = useWorkouts();

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

			<ListGroup>
				{workoutList.map(
					(workoutList: {
						id: string;
						title: string;
						duration: number;
						description: string;
						date: Date;
					}) => {
						return (
							<ListGroupItem key={workoutList.id}>
								<WorkoutBlock
									workoutId={workoutList.id}
									workoutTitle={workoutList.title}
									workoutDuration={workoutList.duration}
									workoutDescription={workoutList.description}
									workoutDate={workoutList.date}
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
		</>
	);
};

export default WorkoutList;
