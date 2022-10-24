import Form from 'react-bootstrap/Form';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type WorkoutFormDescriptionProps = {
	editorState: EditorState;
	handleWorkoutDescriptionState: (state: EditorState) => void;
	workoutDescription: string;
};

const WorkoutEditFormDescription = (props: WorkoutFormDescriptionProps) => {
	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label className='form-label'>Description</Form.Label>
			<Editor
				//placeholder={props.workoutDescription}
				editorState={props.editorState}
				//onEditorStateChange={props.onEditorStateChange}
				onEditorStateChange={(editorState) =>
					props.handleWorkoutDescriptionState(editorState)
				}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
		</Form.Group>
	);
};

export default WorkoutEditFormDescription;
