import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
    name: {
        content: String,
    },
    detailFinancial:{
        type: Number,
        required: true
    },
    folderId: {
        type: String,
        required: true
    }
}, {timestamps: true});


const NoteMoDel = mongoose.model('Note',NoteSchema)
export default NoteMoDel;