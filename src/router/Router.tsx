import { Routes, Route } from 'react-router-dom';
import AddWorkout from '../components/pages/AddWorkout/AddWorkout';
import WorkoutList from '../components/pages/WorkoutList/WorkoutList';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<WorkoutList />} />
			<Route path='/add-workout' element={<AddWorkout />} />
		</Routes>
	);
};

export default Router;
