import axios from 'axios';

class PingSiteService {
	ping() {
		return axios.get(`${process.env.REACT_APP_WORKOUT_BASE_URL}/Account/Ping`);
	}
}

export default new PingSiteService();
