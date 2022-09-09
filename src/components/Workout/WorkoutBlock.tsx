import { Accordion, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutBlock = (props: any) => {
	return (
		<div>
			<Accordion>
				<Accordion.Item eventKey='0'>
					<Accordion.Header>
						<Col lg='2' className='header-column '>
							<h3>{props.workoutDuration}</h3>
						</Col>
						<Col className='header-column text-center'>
							<h1>{props.workoutTitle}</h1>
						</Col>
						<Col xs lg='2'>
							<DatePicker
								custom-attribute={props.workoutIndex}
								className='datepicker text-center'
								selected={props.workoutDate}
								onChange={(date: Date) =>
									props.setStartDate(props.workoutIndex, date)
								}
								dateFormat='eee/dd/MM/yyyy'
							/>
						</Col>
					</Accordion.Header>
					<Accordion.Body>
						<p>{props.workoutDescription}</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};

export default WorkoutBlock;
