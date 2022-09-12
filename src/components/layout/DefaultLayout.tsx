import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Router from '../../router/Router';

const DefaultLayout = () => {
	return (
		<>
			<Container>
				{/* Header instead of h1, navbar */}
				<h1 className='title text-center'>Workout Tracker</h1>
				<Router />
				{/* Footer */}
			</Container>
		</>
	);
};

export default DefaultLayout;
