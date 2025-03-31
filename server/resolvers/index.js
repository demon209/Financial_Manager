import fakeData from "../fakeData/index.js"
import { AuthorMoDel, FolderMoDel, NoteMoDel } from "../modals/index.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
    //   return fakeData.folders;
        const folders = await FolderMoDel.find({
          authorId: context.uid
        }).sort({
          updatedAt: 'desc'
        })
        console.log({folders,context})
        return folders
    },
    folder: async (parent,args)=>{
      const folderId =args.folderId;
      const foundFolder = await FolderMoDel.findById(folderId)
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const foundNote = await NoteMoDel.findById(noteId); 
      return foundNote;
    }
    
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorMoDel.findOne({
        uid: authorId
      })
      return author
    },
    notes: async (parent) => {
      const notes = await NoteMoDel.find({ folderId: parent._id });
      return notes;
    }
  },
  Mutation: {
      addFolder: async (parent, args, context) =>{
        const newFolder =  new FolderMoDel({...args, authorId: context.uid});
        console.log(newFolder);
        await newFolder.save();
        return newFolder;

      },
      addNote: async (parent, args)=>{
        const newNote = new NoteMoDel(args)
        await newNote.save();
        return newNote
      },
      deleteNote: async (parent, args) => {
        const noteId = args.id;
        const deletedNote = await NoteMoDel.findByIdAndDelete(noteId);
        return deletedNote;
      }
      ,
      updateNote: async (parent, args)=>{
        const noteId = args.id;
        const note = await NoteMoDel.findByIdAndUpdate(noteId,args)
        return note
      },
  
      register: async (parent, args) =>{
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