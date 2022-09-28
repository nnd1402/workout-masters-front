import { Button } from 'react-bootstrap';

type WorkoutBlockAccordionButtonProps = {
	showDescription: () => void;
	open: boolean;
};

const WorkoutBlockAccordionButton = (
	props: WorkoutBlockAccordionButtonProps
) => {
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
