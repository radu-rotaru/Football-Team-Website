const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('post', express.urlencoded({extended:true}));

app/post('/post', function(req, res)
{
  res.send("Felicitari, " + req.body.username);
});

app.listen(3000, function() {console.log('Serverul asculta pe portul 3000')});
