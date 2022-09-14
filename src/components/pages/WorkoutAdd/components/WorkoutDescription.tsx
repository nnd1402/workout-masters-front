import Form from 'react-bootstrap/Form';

const WorkoutDescription = () => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label>Description</Form.Label>
			<Form.Control
				size='lg'
				as='textarea'
				rows={4}
				placeholder='What exercises did you do?'
			/>
		</Form.Group>
	);
};

export default WorkoutDescription;
