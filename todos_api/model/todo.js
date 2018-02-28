var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    idNumber: {
        type: Number,
        required: 'idNumber cannot be blank!'
    },
    title: {
        type: String,
        default: "problem"
    },
    acceptance: {
        type: String,
        default: '0%'
    },
    difficulty: {
        type: String,
        default: "unknown"
    },url: {
        type: String,
    },
    done_date: {
        type: Date,
        default: Date.now
    }
    
});

var Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;
