import fakeData from "../fakeData/index.js"
import { FolderMoDel } from "../modals/index.js";

export const resolvers = {
  Query: {
    folders: async () => {
    //   return fakeData.folders;
        const folders = await FolderMoDel.find()
        return folders

    },
    folder: (parent,args)=>{
      const folderId =args.folderId;
      return fakeData.folders.find(folder => folder.id ===folderId);
    },
    note: (parent,args)=>{
      const noteId =args.noteId;
      return fakeData.notes.find(note => note.id ===noteId);
    }
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      // const authorId = parent.authorId;
      return fakeData.notes.filter(note=>note.folderId === parent.id);
    },
  },
//   Mutation: {

//   }
};