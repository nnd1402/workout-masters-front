import axios from 'axios';

let axiosConfig = {
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	}
};

class AuthService {
	login(username: string, password: string) {
		return axios
			.post(
				`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/Login`,
				{
					username,
					password
				},
				axiosConfig
			)
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	logout() {
		localStorage.removeItem('user');
	}

	register(username: string, password: string) {
		return axios.post(
			`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/Register`,
			{
				username,
				password
			},
			axiosConfig
		);
	}

	getCurrentUser() {
		const userStr = localStorage.getItem('user');
		if (userStr) return JSON.parse(userStr);

		return null;
	}

	ping() {
		return axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/Ping`);
	}
}

export default new AuthService();
