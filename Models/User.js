import mongoose from 'mongoose';

// Define the schema for the user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name field is required
  },
  email: {
    type: String,
    required: true, // The email field is required
    unique: true,   // The email must be unique across users
  },
  password: {
    type: String,
    required: true, // The password field is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the created date to the current date
  }
});

// Check if the model is already compiled to avoid recompiling it (useful in development)
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;