const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    taskIDs: [String]
});

module.exports = mongoose.model('lists', ListSchema);