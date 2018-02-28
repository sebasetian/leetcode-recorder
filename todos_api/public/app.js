var KEY_ENTER = 13;
var leetcodeDic;
var HARD = 2;
var MEDIUM = 1;
var EASY = 0;
/**
 *  initialization
 */
$(document).ready(function() {
  loadJSON();
  $.getJSON("/api/todos")
    .then(function(problems) {
      addTodos(problems, '');
    })
    .catch(function(err) {
      console.log(err);
    });
  $('#todoInput').keypress(function(event) {
    if (event.which == KEY_ENTER) {
      createTodo();
    }
  });
  $('.btnArea').on('click', '#Hard', function() {
    $('.list').empty();
    $.getJSON("/api/todos")
      .then(function(problems) {
        addTodos(problems, 'Hard');
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  $('.btnArea').on('click', '#Medium', function() {
    $('.list').empty();
    $.getJSON("/api/todos")
      .then(function(problems) {
        addTodos(problems, 'Medium');
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  $('.btnArea').on('click', '#Easy', function() {
    $('.list').empty();
    $.getJSON("/api/todos")
      .then(function(problems) {
        addTodos(problems, 'Easy');
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  $('.btnArea').on('click', '#Random', function() {
    $('.list').empty();
    $.getJSON("/api/todos")
      .then(function(problems) {
        randomAdd(problems);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  $('.list').on('click', 'li', function() {
    openTheProblem($(this));
    // updateTodo($(this));
  });
  $('.list').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});
/**
 * Load leetcode problems library
 */
function loadJSON() {
  $.getJSON("leetcodeList.json")
    .then(function(data) {
      leetcodeDic = data;
      console.log("problems are loaded");
    });
}
/**
 * Remove problems
 */
function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = 'api/todos/' + clickedId;
  $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data) {
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Retrive problems
 */

function addTodos(todos, dif) {
  if (dif === '') {
    todos.forEach(function(todo) {
      addTodoNow(todo);
    });
  } else {
    todos.forEach(function(todo) {
      addTodosDif(todo, dif);
    });
  }
}

/**
 * Retrive single problem
 */
function randomAdd(problems){
  let index = Math.floor(Math.random()*problems.length);
  var randProblem = $('<li class="task">' + problems[index].idNumber + '. ' +
    problems[index].title + '<span>X</span></li>');
    randProblem.data('id', problems[index]._id);
    addHardness(randProblem, problems[index]);
    randProblem.data('completed', false);
    // if (todo.completed) {
    //   newTodo.addClass("done");
    // }
  $('.list').append(randProblem);
}
function addTodoNow(todo) {
  var newTodo = $('<li class="task">' + todo.idNumber + '. ' +
    todo.title + '<span>X</span></li>');
  newTodo.data('id', todo._id);
  addHardness(newTodo, todo);
  newTodo.data('completed', false);
  // if (todo.completed) {
  //   newTodo.addClass("done");
  // }
  $('.list').append(newTodo);
}

function addTodosDif(todo, dif) {
  if (todo.difficulty === dif) {
    var newTodo = $('<li class="task">' + todo.idNumber + '. ' +
      todo.title + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    addHardness(newTodo, todo);
    newTodo.data('completed', false);
    // if (todo.completed) {
    //   newTodo.addClass("done");
    // }
    $('.list').append(newTodo);
  }
}

function addTodosDif(todo) {
    var newTodo = $('<li class="task">' + todo.idNumber + '. ' +
      todo.title + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    addHardness(newTodo, todo);
    newTodo.data('completed', false);
    // if (todo.completed) {
    //   newTodo.addClass("done");
    // }
    $('.list').append(newTodo);
}

/**
 * Add problem's hardness
 */
function addHardness(newTodo, todo) {
  if (todo.difficulty === 'Hard') {
    newTodo.data('hardness', 2);
  }
  else if (todo.difficulty === 'Medium') {
    newTodo.data('hardness', 1);
  }
  else {
    newTodo.data('hardness', 0);
  }
}
/**
 * Add a new problem
 */
function createTodo() {
  var userInput = $('#todoInput').val();
  var problemId = userInput - 1;
  while ((problemId < 1000 && problemId >= leetcodeDic.length) ||
    userInput < leetcodeDic[problemId].idNumber) {
    problemId--;
  }
  if (userInput != leetcodeDic[problemId].idNumber) {
    alert("This problem is not existed");
    return;
  }
  var problem = {
    idNumber: userInput,
    title: leetcodeDic[problemId].title,
    acceptance: leetcodeDic[problemId].acceptance,
    difficulty: leetcodeDic[problemId].difficulty,
    url: leetcodeDic[problemId].url
  };
  $.post('api/todos', problem)
    .then(function(newTodo) {
      $('#todoInput').val('');
      addTodoNow(newTodo);
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Update problems
 */
function updateTodo(todo) {
  var clickedId = todo.data('id');
  var updateUrl = 'api/todos/' + clickedId;
  var isDone = todo.data('completed');
  var updateData = { completed: !isDone };

  $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
    .then(function(updateTodo) {
      todo.toggleClass("done");
      todo.data('completed', !isDone);
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * 
 */
function openTheProblem(problemClick) {
  var url = window.open('https://leetcode.com/problems/');
  $.getJSON('api/todos/' + problemClick.data('id'))
    .then(function(problemObj) {
      url.location.href = 'https://leetcode.com/problems/' + problemObj.url;
    });
}
