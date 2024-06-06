import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);
export default Email;
