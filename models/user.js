import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, index: true },
    password: { type: String, required: true, trim: true }
}, { timestamps: true });

mongoose.models = {};

export default mongoose.model('User', userSchema);