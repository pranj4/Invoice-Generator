import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email: { type: String, unique: true ,trim: true, required: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 8 },
},{timestamps: true});

export default mongoose.model('User', userSchema);
