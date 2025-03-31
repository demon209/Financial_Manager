import { graphQLrequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
                  folder(folderId: $folderId) {
                    id
                    name
                    notes {
                      id
                      name
                      content
                      detailFinancial
                    }
                  }
                }`;
  const data = await graphQLrequest({
    query,
    variables: { folderId }
  });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
                    note(noteId: $noteId) {
                        id
                        name
                        content
                        detailFinancial
                    }
                 }`;
  const data = await graphQLrequest({
    query,
    variables: { noteId }
  });
  return data;
};

export const addNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => {
    formDataObj[key] = key === "detailFinancial" ? Number(value) || 0 : value;
  });
  console.log({ formDataObj });

  const query = `mutation AddNote($name: String!, $content: String!, $detailFinancial: Int!, $folderId: ID!) {
      addNote(name: $name, content: $content, detailFinancial: $detailFinancial, folderId: $folderId) {
        id
        content
        name
        detailFinancial
      }
    }`;
  const { addNote } = await graphQLrequest({ query, variables: formDataObj });
  console.log({ addNote });
  return addNote;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log({ formDataObj });

  const query = `mutation UpdateNote($id: String!, $content: String!) {
      updateNote(id: $id, content: $content) {
        id
        content
      }
    }`;
  const { updateNote } = await graphQLrequest({ query, variables: formDataObj });
  console.log({ updateNote });
  return updateNote;
};

export const deleteNote = async ({ params }) => {
  const query = `mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }`;

  const { deleteNote } = await graphQLrequest({
    query,
    variables: { id: params.noteId },
  });

  return deleteNote;
};

