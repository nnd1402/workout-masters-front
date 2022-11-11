import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
	return (
		<Container fluid>
			<Row>
				<Col className='footer text-center py-3'>
					Copyright &copy; Workout Tracker
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
