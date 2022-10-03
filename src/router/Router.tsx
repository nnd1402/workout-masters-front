import { Routes, Route } from 'react-router-dom';
import WorkoutAddForm from '../components/pages/WorkoutAdd/WorkoutAddForm';
import WorkoutEditForm from '../components/pages/WorkoutEdit/WorkoutEditForm';
import WorkoutList from '../components/pages/WorkoutList/WorkoutList';

const Router = () => {
	return (
		<Routes>
			<Route path='/list' element={<WorkoutList />} />
			<Route path='/add-workout' element={<WorkoutAddForm />} />
			<Route path='/edit-workout/:workoutId' element={<WorkoutEditForm />} />
		</Routes>
	);
};

export default Router;
