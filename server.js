var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title : 'Article 1 | ramya victor',
        heading : 'Article 1',
        date : '5th Feb 2017',
        content : `
                <p>
                This is the first article to be displayed on the webpage.
                Isn't this a great think to admire???
                </p>
                <p>
                    Yipee... Yahoo... All are the expressions of joy...
                </p>`
        
    },
    'article-two' : {
        title : 'Article 2 | ramya victor',
        heading : 'Article 2',
        date : '9th Feb 2017',
        content : `
                <p>
                This is the second article to be displayed on the webpage.
                Isn't this a great think to admire???
                </p>
                <p>
                    Yipee... Yahoo... All are the expressions of joy...
                </p>`
    },
     'article-three' : {
        title : 'Article 3 | ramya victor',
        heading : 'Article 3',
        date : '12th Feb 2017',
        content : `
                <p>
                This is the third article to be displayed on the webpage.
                Isn't this a great think to admire???
                </p>
                <p>
                    Yipee... Yahoo... All are the expressions of joy...
                </p>`
    }
}

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
