import Axios from 'axios';

export const getWorkouts = () => {
	return Axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}`).then(
		(response) => response.data
	);
};
