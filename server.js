const express = require('express');
const path = require('path');
const app = express();

//get Post routes
const posts = require('./server/routes/posts');

//middleware
app.use(express.static(path.join(__dirname, 'dist')));
//app.use('posts')

//catch all other routes request and return to index
app.get('',(req, res)=>{
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{
  console.log(`Server running on port ${port}`);
});



