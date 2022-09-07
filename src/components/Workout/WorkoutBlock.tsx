import { useState } from 'react';
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlock = () => {
	const [initialDates, setDate] = useState([
		{ value: new Date() },
		{ value: new Date('December 17, 1995 03:24:00') },
		{ value: new Date('December 9, 1996 03:24:00') },
		{ value: new Date('December 12, 1997 03:24:00') },
		{ value: new Date('December 13, 1998 03:24:00') },
		{ value: new Date('December 14, 1999 03:24:00') }
	]);

	function setStartDate(index: any, date: any) {
		let updatedDates = [...initialDates];
		updatedDates[index].value = date;
		setDate(updatedDates);
		console.log(date);
	}

	return (
		<div>
			{initialDates.map((date, index) => {
				return (
					<li custom-attribute={index}>
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
											custom-attribute={index}
											className='datepicker text-center'
											selected={date.value}
											onChange={(date: Date) => setStartDate(index, date)}
											dateFormat='eee/dd/MM/yyyy'
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
					</li>
				);
			})}
			;
		</div>
	);
};

export default WorkoutBlock;
