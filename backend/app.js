const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
require('dotenv').config();
const listController = require('./controllers/list');
const taskController = require('./controllers/task');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get("/lists", listController.getLists);
app.route('/lists/:listId')
    .get(listController.getList)
    .post(listController.addList)
    .put(listController.editList)
    .delete(listController.deleteList);

app.get("/tasks", taskController.getTasks);
app.route('/tasks/:taskId')
    .get(taskController.getTask)
    .post(taskController.addTask)
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
