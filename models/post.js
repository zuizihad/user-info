import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    full_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, trim: true },
    address: { type: String },
    date_of_birth: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

}, { timestamps: true });

mongoose.models = {};

export default mongoose.model('Post', postSchema);