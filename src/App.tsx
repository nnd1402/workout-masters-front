import { Container, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import WorkoutList from './components/Workout/WorkoutList';

function App() {
	return (
		<>
			<Container>
				<h1 className='title text-center'>Workout Tracker</h1>
				<WorkoutList />
				<div className='btn-container text-center'>
					<Button variant='danger' className='add-button'>
						Add Workout
					</Button>
				</div>
			</Container>
		</>
	);
}

export default App;
