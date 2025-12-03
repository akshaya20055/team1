const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'college_admin'],
    required: true,
  },
  college: {
    type: String, // for students, college name
    required: function() { return this.role === 'student'; }
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);