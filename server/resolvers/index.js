import fakeData from "../fakeData/index.js"
import { AuthorMoDel, FolderMoDel } from "../modals/index.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
    //   return fakeData.folders;
        const folders = await FolderMoDel.find({authorId: context.uid})
        console.log({folders,context})
        return folders

    },
    folder: async (parent,args)=>{
      const folderId =args.folderId;
      const foundFolder = await FolderMoDel.findOne({
        _id: folderId
      })
      return foundFolder;
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
  Mutation: {
      addFolder: async (parent, args, context) =>{
        const newFolder =  new FolderMoDel({...args, authorId: context.uid});
        console.log(newFolder);
        await newFolder.save();
        return newFolder;

      },
      register: async (parent, args) =>{
        const newUser = new AuthorMoDel(args);
        const foundUser = await AuthorMoDel.findOne({uid: args.uid})
        if(!foundUser){
          const newUser = new AuthorMoDel(args);
          await newUser.save();
          return newUser
        }else{
          return foundUser;
        }
      }
  }
};