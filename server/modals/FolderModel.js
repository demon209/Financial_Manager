import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // ✅ Sửa từ 'require' thành 'required'
    },
    financial: {
        type: Number,
        required: true // ✅ Sửa từ 'require' thành 'required'
    },
    authorId: {
        type: String,
        required: true // ✅ Sửa từ 'require' thành 'required'
    }
}, { timestamps: true });

const FolderModel = mongoose.model('Folder', folderSchema);
export default FolderModel;
