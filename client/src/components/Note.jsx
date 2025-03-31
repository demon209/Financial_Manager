import React, { useEffect, useMemo, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";
const Note = () => {
  const { note } = useLoaderData();
  const submit = useSubmit()
  const location = useLocation();
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

  useEffect(()=>{
    debounceMemmorized(rawHTML,note,location.pathname)
  },[rawHTML,location.pathname])

  const debounceMemmorized = useMemo(()=>{
    return debounce((rawHTML,note, pathname)=>{
      if(rawHTML ===note.content) return;
      submit({...note,content: rawHTML}, {
        method: 'post',
        action: pathname,
      })
    },1000)
  },[])

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
