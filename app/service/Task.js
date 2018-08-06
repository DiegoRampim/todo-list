const mongoose = require('mongoose');
const User = require('./User');

const TaskSchema = new mongoose.Schema({
    user: User,
    description: String,
    date: Date,
    status: Boolean
});

mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');