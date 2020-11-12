const List = require('../models/List');
const ObjectID = require('mongoose').ObjectID;

exports.getLists = (req, res) => {
    List.find((err, lists) => {
        if (err) return res.status(500);
        if(!lists || lists.length < 1) return res.status(404);
        return res.status(200).json(lists);
    });
};

exports.getList = (req, res) => {
    List.findById(req.params.listId, (err, list) => {
        if (err) return res.status(500).json({error:500});
        if(!list) return res.status(404).json({error:404});
        return res.status(200).json(list);
    });
};

exports.addList = (req, res) => {
    const { title, description, taskIds } = req.body;

    const list = new List({ title: title, color: color, description: description, taskIds: taskIds.split(",") });
    list.save(err => {
        if (err) return res.status(500).json({error: 500});
        return res.status(201).json(list);
    });
};

exports.editList = (req, res) => {
    List.findByIdAndUpdate(
        req.params.listId,
        req.body,
        {new: true},
        (err, list) => {
            if (err) return res.status(500).json({error:500});
            return res.status(200).json(list);
        }
    )
};

exports.deleteList = (req, res) => {
    List.findByIdAndRemove(req.params.listId, (err, list) => {
        if (err) return res.status(500).json({error:500});
        const response = {
            message: "List successfully deleted",
            id: list._id
        };
        return res.status(200).send(response);
    });
};