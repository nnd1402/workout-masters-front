import Form from 'react-bootstrap/Form';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WorkoutDescription = (props: any) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label>Description</Form.Label>
			<Editor
				defaultEditorState={props.editorState}
				onEditorStateChange={props.handleWorkoutDescriptionState}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
		</Form.Group>
	);
};

export default WorkoutDescription;
