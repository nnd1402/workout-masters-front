import { Link } from 'react-router-dom';

const AddWorkout = () => {
	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6'>
						<h1>Add Workout</h1>
					</div>
				</div>
				<Link to='/' className='btn btn-primary'>
					To Workout List
				</Link>
			</div>
		</>
	);
};

export default AddWorkout;
