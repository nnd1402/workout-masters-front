import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const WorkoutBlockDescription = (props: any) => {
	return (
		<>
			<Editor
				editorState={props.editorState}
				onEditorStateChange={props.onEditorStateChange}
				wrapperClassName='wrapper-class'
				toolbarClassName='toolbar-class gap'
				editorClassName='editor-class'
			/>
		</>
	);
};

export default WorkoutBlockDescription;
