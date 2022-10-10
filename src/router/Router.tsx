import { Routes, Route } from 'react-router-dom';
import UserRegisterForm from '../components/pages/UserRegister/UserRegisterForm';
import WorkoutAddForm from '../components/pages/WorkoutAdd/WorkoutAddForm';
import WorkoutEditForm from '../components/pages/WorkoutEdit/WorkoutEditForm';
import WorkoutList from '../components/pages/WorkoutList/WorkoutList';

const Router = () => {
	return (
		<Routes>
			<Route path='/list' element={<WorkoutList />} />
			<Route path='/add-workout' element={<WorkoutAddForm />} />
			<Route path='/edit-workout/:workoutId' element={<WorkoutEditForm />} />
			<Route path='/register' element={<UserRegisterForm />} />
		</Routes>
	);
};

export default Router;
