const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
// app.use(express.static(__dirname + '/dist/video-portfolio-app'));
// app.use(express.static('build'));

// Send all requests to index.html
// app.get('*', function (req, res) {
//   const index = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(index);
// });

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/video-portfolio-app/index.html'));
// });

app.get('*', function (req, res) {
  res.sendFile('index.html');
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);