import { Routes, Route } from 'react-router-dom';
import AddWorkoutForm from '../components/pages/AddWorkout/AddWorkoutForm';
import WorkoutList from '../components/pages/WorkoutList/WorkoutList';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<WorkoutList />} />
			<Route path='/add-workout' element={<AddWorkoutForm />} />
		</Routes>
	);
};

export default Router;
