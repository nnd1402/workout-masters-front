import { useState } from 'react';
import WorkoutBlock from './WorkoutBlock';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from 'react-bootstrap';

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

	function setStartDate(index: any, date: any): void {
		let updatedDates = [...dateInfo];
		updatedDates[index].workoutDate = date;
		setDateInfo(updatedDates);
	}

	return (
		<>
			<ListGroup>
				{dateInfo.map((dateInfo: any, index) => {
					return (
						<ListGroupItem key={index}>
							<WorkoutBlock
								key={index}
								workoutIndex={index}
								workoutTitle={dateInfo.workoutTitle}
								workoutDuration={dateInfo.workoutDuration}
								workoutDescription={dateInfo.workoutDescription}
								workoutDate={dateInfo.workoutDate}
								setStartDate={setStartDate}
							/>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</>
	);
};

export default WorkoutList;
