const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    Task.find((err, tasks) => {
        if (err) return res.status(500).json({error:500});
        if(!tasks) return res.status(404).json({error:404});
        return res.status(200).json(tasks);
    });
};

exports.getTask = async (req, res) => {
    Task.findById(req.params.taskId, (err, tasks) => {
        if (err) return res.status(500).json({error:500});
        if(!tasks) return res.status(404).json({error:404});
        return res.status(200).json(tasks);
    });
};

exports.addTask = async (req, res) => {
    const { title, description, imgUrl } = req.body;

    const task = new Task({ title: title, description: description, imgUrl: imgUrl });
    task.save(err => {
        if (err) return res.status(500).json({error:500});
        return res.status(201).json(task);
    });
};

exports.editTask = async (req, res) => {
    Task.findByIdAndUpdate(
        req.params.taskId,
        req.body,
        {new: true},
        (err, task) => {
            if (err) return res.status(500).json({error:500});
            return res.status(200).json(task);
        }
    )
};

exports.deleteTask = async (req, res) => {
    Task.findByIdAndRemove(req.params.taskId, (err, task) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Task successfully deleted",
            id: task._id
        };
        return res.status(200).send(response);
    });
};