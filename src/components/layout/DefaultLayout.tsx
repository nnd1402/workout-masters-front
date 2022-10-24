import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Router from '../../router/Router';
import Nav from '../header/Nav';

const DefaultLayout = () => {
	return (
		<>
			<Nav />
			<Container className='mt-5'>
				<Router />
				{/* Footer */}
			</Container>
		</>
	);
};

export default DefaultLayout;
