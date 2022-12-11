import axios from 'axios';

class AuthService {
	login(username: string, password: string) {
		return axios
			.post(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/Login`, {
				username,
				password
			})
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
			}
		);
	}

	getCurrentUser() {
		const userStr = localStorage.getItem('user');
		if (userStr) return JSON.parse(userStr);

		return null;
	}
}

export default new AuthService();
