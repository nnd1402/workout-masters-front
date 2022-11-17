import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Router from '../../router/Router';
import Footer from '../footer/Footer';
import Nav from '../header/Nav';

const DefaultLayout = () => {
	return (
		<>
			<Nav />
			<Container className='mt-5'>
				<Router />
			</Container>
			{/* <Footer /> */}
		</>
	);
};

export default DefaultLayout;
