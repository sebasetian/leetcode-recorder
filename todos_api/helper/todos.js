var db = require('../model');
exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}
exports.createTodos = function(req,res){
    db.Todo.create(req.body)
    .then(function(newtodo){
        res.status(201).json(newtodo);
    })
    .catch(function(err){
        res.send(err);
    })
}
exports.retriveTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}
exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}
exports.deleteTodo = function(req,res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "We deleted it"});
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;