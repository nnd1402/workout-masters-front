import { Button } from 'react-bootstrap';

const WorkoutBlockAccordionButton = (props: any) => {
	return (
		<>
			<Button
				className={`${
					props.open ? 'accordion-button' : 'accordion-button collapsed'
				}`}
				variant='transparent'
				onClick={props.showDescription}
				aria-controls='example-collapse-text'
				aria-expanded={props.open}
			></Button>
		</>
	);
};

export default WorkoutBlockAccordionButton;
