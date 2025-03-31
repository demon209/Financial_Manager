import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    folderId: {
        type: String,
        required: true
    },
    detailFinancial:{
        type: Number,
        required: true,
    }
}, {timestamps: true});


const NoteMoDel = mongoose.model('Note',NoteSchema)
export default NoteMoDel;