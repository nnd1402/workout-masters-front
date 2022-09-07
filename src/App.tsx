import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import WorkoutList from './components/Workout/WorkoutList';

function App() {
	return (
		<>
			<Container>
				<h1 className='text-center'>Workout Tracker</h1>
				<WorkoutList />
			</Container>
		</>
	);
}

export default App;
