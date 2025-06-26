import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    preferences: {
        theme: { type: String, enum: ['light', 'dark'], default: 'light' },
        units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
        notifications: { type: Boolean, default: true }
    },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
