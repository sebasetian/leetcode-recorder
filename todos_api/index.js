var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    
var todoRoute = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoute);

app.listen(port,function(){
    console.log("APP IS RUNNING ON PORT " + port);
});