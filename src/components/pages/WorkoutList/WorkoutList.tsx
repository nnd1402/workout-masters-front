import { useState } from 'react';
import WorkoutBlock from './WorkoutBlock';
import { ListGroup, ListGroupItem, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
import WorkoutDeleteBtn from './components/WorkoutDeleteBtn';

const WorkoutList = () => {
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

	//const [isShowingAlert, setShowingAlert] = useState(false);

	const [searchParams] = useSearchParams();
	const showMessage = searchParams.get('showMessage');

	function setStartDate(index: any, date: any): void {
		let updatedDates = [...dateInfo];
		updatedDates[index].workoutDate = date;
		setDateInfo(updatedDates);
	}

	return (
		<>
			{showMessage === 'success' && (
				<Alert className='text-center' variant='success'>
					You successfully added workout!
				</Alert>
			)}

			<ListGroup>
				{dateInfo.map((dateInfo: any, index) => {
					return (
						<ListGroupItem key={index}>
							<Row>
								<Col sm='11'>
									<WorkoutBlock
										key={index}
										workoutIndex={index}
										workoutTitle={dateInfo.workoutTitle}
										workoutDuration={dateInfo.workoutDuration}
										workoutDescription={dateInfo.workoutDescription}
										workoutDate={dateInfo.workoutDate}
										setStartDate={setStartDate}
									/>
								</Col>

								<Col xs>
									<WorkoutDeleteBtn workoutTitle={dateInfo.workoutTitle} />
								</Col>
							</Row>
						</ListGroupItem>
					);
				})}
			</ListGroup>
			<div className='btn-container text-center'>
				<Link to='/add-workout' className='add-button btn btn-danger'>
					Add Workout
				</Link>
			</div>
		</>
	);
};

export default WorkoutList;
