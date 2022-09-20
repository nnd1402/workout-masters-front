import { Routes, Route } from 'react-router-dom';
import AddWorkoutForm from '../components/pages/WorkoutAdd/WorkoutAddForm';
import WorkoutList from '../components/pages/WorkoutList/WorkoutList';

const Router = () => {
	return (
		<Routes>
			<Route path='/list' element={<WorkoutList />} />
			<Route path='/add-workout' element={<AddWorkoutForm />} />
		</Routes>
	);
};

export default Router;
