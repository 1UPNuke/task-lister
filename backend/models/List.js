const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    color: String,
    taskIds: [String]
});

module.exports = mongoose.model('lists', ListSchema);