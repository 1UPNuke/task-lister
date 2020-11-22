const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
});

module.exports = mongoose.model('tasks', TaskSchema);