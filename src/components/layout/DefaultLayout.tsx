import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Router from '../../router/Router';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const DefaultLayout = () => {
	return (
		<div>
			<header className='header'>
				<Header />
			</header>
			<main className='main'>
				<Router />
			</main>
			<footer className='footer'>
				<Footer />
			</footer>
		</div>
	);
};

export default DefaultLayout;
