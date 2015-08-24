var express = require('express'),
    visite = require('./visite');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
//     app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
});

app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('Web Service salon Lego Dole 2015');
});

app.listen(process.env.PORT || 4730);

//Methode de recherche des devoirs par date 
app.get('/countVisiteur', visite.countVisiteur);
app.get('/addVisiteur/:nombre', visite.addVisiteur);
app.get('/removeVisiteur/:nombre', visite.removeVisiteur);
app.get('/getDate', visite.getTime);

// //Methode de mise a jour de la notation du groupe sur un devoir
// //app.put('/devoirs/notation/:idGroupe/:idCritere/:appreciation/:poids', devoirs.updateNotation);
// //Il faut PUT pour update mais pour dev je GET
// app.post('/devoir/notation', devoirs.updateNotation);

app.listen(8080);
console.log('Server lancé!');
