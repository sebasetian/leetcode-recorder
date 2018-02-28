var express = require('express');
var router = express.Router();
var db = require("../model");
var helper = require('../helper/todos');
router.route('/')
    .get(helper.getTodos)
    .post(helper.createTodos)
router.route('/:todoId')
    .get(helper.retriveTodo)
    .put(helper.updateTodo)
    .delete(helper.deleteTodo)
module.exports = router;