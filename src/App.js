import './App.css';
import { useState } from 'react';
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<>
			<Container className='container'>
				<h1 className='title text-center'>Workout Tracker</h1>
				<Row>
					<Col>
						<Accordion>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>
									<Col lg='2' className='header-column '>
										<h3>80 minutes</h3>
									</Col>
									<Col className='header-column text-center'>
										<h1>Push Day</h1>
									</Col>
									<Col xs lg='2'>
										<DatePicker
											className='datepicker text-center'
											selected={startDate}
											onChange={(date) => setStartDate(date)}
										/>
									</Col>
								</Accordion.Header>
								<Accordion.Body>
									<p>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Minus commodi nostrum quidem sint reiciendis quia ipsa.
										Praesentium nesciunt deleniti autem, quo sunt perspiciatis a
										nulla? Saepe obcaecati neque officiis soluta?
									</p>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<Accordion>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>
									<Col lg='2' className='header-column '>
										<h3>50 minutes</h3>
									</Col>
									<Col className='header-column text-center'>
										<h1>Pull Day</h1>
									</Col>
									<Col xs lg='2'>
										<DatePicker
											className='datepicker text-center'
											selected={startDate}
											onChange={(date) => setStartDate(date)}
										/>
									</Col>
								</Accordion.Header>
								<Accordion.Body>
									<p>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Minus commodi nostrum quidem sint reiciendis quia ipsa.
										Praesentium nesciunt deleniti autem, quo sunt perspiciatis a
										nulla? Saepe obcaecati neque officiis soluta?
									</p>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<Accordion>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>
									<Col lg='2' className='header-column '>
										<h3>45 minutes</h3>
									</Col>
									<Col className='header-column text-center'>
										<h1>Leg Day</h1>
									</Col>
									<Col xs lg='2'>
										<DatePicker
											className='datepicker text-center'
											selected={startDate}
											onChange={(date) => setStartDate(date)}
										/>
									</Col>
								</Accordion.Header>
								<Accordion.Body>
									<p>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Minus commodi nostrum quidem sint reiciendis quia ipsa.
										Praesentium nesciunt deleniti autem, quo sunt perspiciatis a
										nulla? Saepe obcaecati neque officiis soluta?
									</p>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
