const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    imgUrl: [String]
});

module.exports = mongoose.model('lists', ListSchema);