import Axios from 'axios';

export const getWorkouts = () => {
	return Axios.get('https://localhost:7116/api/InMemoryWorkout').then(
		(response) => response.data
	);
};
