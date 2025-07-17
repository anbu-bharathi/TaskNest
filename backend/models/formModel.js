const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDesc: String,
    dueDate: Date,
    prior: String,
    teamMem: String,
    attachment: String, 
}, { collection: 'formdata' });
 
const TaskModel = mongoose.model('TaskModel', taskSchema);
module.exports = TaskModel;