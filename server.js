var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000);
console.log("Server started on port " + process.env.PORT || 3000);