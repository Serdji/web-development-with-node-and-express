const express = require('express');
const fortune = require('./lib/fortune.js');

const app = express();

// set up handlebars view engine
const handlebars = require('express3-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home', {
		title: 'Главная страница'
	});
});
app.get('/about', (req,res) => {
	res.render('about', {
		fortune: fortune.getFortune(),
		title: 'Рандомный текст'
	} );
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
