var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
   user: 'ramyavictor89',
   database: 'ramyavictor89',
   host: 'db.imad.hasura-app.io',
   port : '5432',
   password: process.env.DB_PASSWORD
};


function createTemplate(data){
    
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width , initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
      <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <div>
           ${heading}
        </div>
        <div>
           ${date}
        </div>
        <div>
            ${content}
        </div>
      </div>
    </body>
    </html>`;

    return htmlTemplate;

}
var counter = 0;

var pool = new Pool(config);
app.get('/articles/:articleName',function(req,res){
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length == 0){
                result.status(404).send('Article not found');
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/counter',function(req,res){
	counter = counter + 1;
	res.send(counter.toString());
});

var names = [];
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return["pbkdf", "salt", 10000,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.get('/submit-name', function (req, res) {
    var name= req.query.name;
    names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function (req,res){
	res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
