import React, { useEffect, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLoaderData } from "react-router-dom";
const Note = () => {
  const { note } = useLoaderData();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    setRawHTML(draftToHtml(convertToRaw(contentState)));
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        placeholder="Write Something"
      />
    </div>
  );
};

export default Note;
