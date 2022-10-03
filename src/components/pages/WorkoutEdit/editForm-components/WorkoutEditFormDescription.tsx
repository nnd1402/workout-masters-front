import Form from 'react-bootstrap/Form';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type WorkoutFormDescriptionProps = {
	editorState: EditorState;
	onEditorStateChange: (state: EditorState) => void;
	handleWorkoutDescriptionState: (state: EditorState) => void;
};

const WorkoutEditFormDescription = (props: WorkoutFormDescriptionProps) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label>Description</Form.Label>
			<Editor
				editorState={props.editorState}
				onEditorStateChange={props.handleWorkoutDescriptionState}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
		</Form.Group>
	);
};

export default WorkoutEditFormDescription;
