var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var bodyParser = require('body-parser')
var app = new (require('express'))()

var mongoose = require('mongoose')
mongoose.connect('localhost:27017/db')
var Schema = mongoose.Schema
var fs = require('fs')
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var dataSchema = new Schema({
	name: {type: String, required: true},
  	data: {type: String, required: true}
}, {collection: 'data'});
var Data = mongoose.model('Data', dataSchema)
var write = ''

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html') 

}) 

app.post("/", function(req, res) { 
    var username = req.body.name;
   	Data.findOne({name: username},function(err, user){
       if (user){
       		user.data = JSON.stringify(req.body.data)
       		write = user.data
        } 
   	});
})

app.get("/save", function(req, res) { 
    var file = __dirname + '/uploadedFile.txt';
    fs.writeFileSync(file, write);
  	res.download(file);  
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
