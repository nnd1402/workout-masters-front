import { Routes, Route, Navigate } from 'react-router-dom';
import UserAccountConfirmation from '../components/pages/UserAccountConfirmation/UserAccountConfirmation';
import UserForgotPasswordForm from '../components/pages/UserForgotPassword/UserForgotPasswordForm';
import UserRequestPasswordResetSuccess from '../components/pages/UserForgotPassword/UserRequestPasswordResetSuccess';
import UserResetPasswordForm from '../components/pages/UserForgotPassword/UserResetPasswordForm';
import UserResetPasswordSuccess from '../components/pages/UserForgotPassword/UserResetPasswordSuccess';
import UserLoginForm from '../components/pages/UserLogin/UserLoginForm';
import RegistrationSuccessful from '../components/pages/UserRegister/RegistrationSuccessful';
import UserRegisterForm from '../components/pages/UserRegister/UserRegisterForm';
import UserRequestNewConfirmationEmail from '../components/pages/UserRequestNewConfirmationEmail/UserRequestNewConfirmationEmail';
import UserRequestNewConfirmationEmailSuccess from '../components/pages/UserRequestNewConfirmationEmail/UserRequestNewConfirmationEmailSuccess';
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
			<Route path='/login' element={<UserLoginForm />} />
			<Route path='/register-success' element={<RegistrationSuccessful />} />
			<Route
				path='/account-confirmation'
				element={<UserAccountConfirmation />}
			/>
			<Route
				path='/request-confirmation-email'
				element={<UserRequestNewConfirmationEmail />}
			/>
			<Route
				path='/request-confirmation-email-success'
				element={<UserRequestNewConfirmationEmailSuccess />}
			/>
			<Route path='/forgot-password' element={<UserForgotPasswordForm />} />
			<Route
				path='/request-reset-password-success'
				element={<UserRequestPasswordResetSuccess />}
			/>
			<Route path='/reset-password' element={<UserResetPasswordForm />} />
			<Route
				path='/reset-password-success'
				element={<UserResetPasswordSuccess />}
			/>
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);
};

export default Router;
