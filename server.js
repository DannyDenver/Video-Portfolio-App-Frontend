const express = require('express');
const app = express();

// Serve static files....
 app.use(express.static(__dirname + '/dist'));

 app.get('*', function (req, res) {
  res.sendFile('index.html');
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);