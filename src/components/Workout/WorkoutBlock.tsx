import { useState } from 'react';
import { Accordion, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlock = () => {
	const [dateInfo, setDateInfo] = useState([
		{
			workoutTitle: 'Push Day',
			workoutDuration: '80 minutes',
			workoutDescription: 'Pushed for Jesus',
			workoutDate: new Date()
		},
		{
			workoutTitle: 'Pull Day',
			workoutDuration: '52 minutes',
			workoutDescription: 'Pulled all day',
			workoutDate: new Date('December 9, 1996 03:24:00')
		},
		{
			workoutTitle: 'Leg Day',
			workoutDuration: '45 minutes',
			workoutDescription: 'Meh',
			workoutDate: new Date('December 12, 1997 03:24:00')
		},
		{
			workoutTitle: 'Calisthenics Day',
			workoutDuration: '90 minutes',
			workoutDescription: 'wtf',
			workoutDate: new Date('December 13, 1998 03:24:00')
		},
		{
			workoutTitle: 'Arm Day',
			workoutDuration: '9 hours',
			workoutDescription: 'Rich Piana',
			workoutDate: new Date('December 14, 1999 03:24:00')
		}
	]);

	function setStartDate(index: any, date: any) {
		let updatedDates = [...dateInfo];
		updatedDates[index].workoutDate = date;
		setDateInfo(updatedDates);
		console.log(date);
	}

	return (
		<div>
			{dateInfo.map((dateInfo, index) => {
				return (
					<Accordion>
						<Accordion.Item eventKey='0'>
							<Accordion.Header>
								<Col lg='2' className='header-column '>
									<h3>{dateInfo.workoutDuration}</h3>
								</Col>
								<Col className='header-column text-center'>
									<h1>{dateInfo.workoutTitle}</h1>
								</Col>
								<Col xs lg='2'>
									<DatePicker
										custom-attribute={index}
										className='datepicker text-center'
										selected={dateInfo.workoutDate}
										onChange={(date: Date) => setStartDate(index, date)}
										dateFormat='eee/dd/MM/yyyy'
									/>
								</Col>
							</Accordion.Header>
							<Accordion.Body>
								<p>{dateInfo.workoutDescription}</p>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				);
			})}
			;
		</div>
	);
};

export default WorkoutBlock;
