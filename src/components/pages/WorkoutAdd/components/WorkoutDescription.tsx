import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WorkoutDescription = (props: any) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const updateTextDescription = (state: any) => {
		setEditorState(state);

		//const data = convertToRaw(editorState.getCurrentContent());

		//need to json.stringify something somewhere blabla
		//convertFromRaw, convertToRaw
	};

	return (
		<Form.Group className='mb-3 form-group'>
			<Form.Label>Description</Form.Label>
			<Editor
				defaultEditorState={editorState}
				onEditorStateChange={updateTextDescription}
				wrapperClassName='wrapper-class'
				editorClassName='editor-class'
				toolbarClassName='toolbar-class'
			/>
		</Form.Group>
	);
};

export default WorkoutDescription;
