const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
require('dotenv').config();
const listController = require('./controllers/list');
const taskController = require('./controllers/task');

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.route("/lists")
    .get(listController.getLists)
    .post(listController.addList);
app.route('api/lists/:listId')
    .get(listController.getList)
    .put(listController.editList)
    .delete(listController.deleteList);

app.route("/tasks")
    .get(taskController.getTasks)
    .post(taskController.addTask);
app.route('/tasks/:taskId')
    .get(taskController.getTask)
    .put(taskController.editTask)
    .delete(taskController.deleteTask);

const port = process.env.PORT || 8080;

mongoose
    .connect(process.env.DB_HOST, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
        app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
    })
    .catch((err) => {
        console.log(err);
    });
