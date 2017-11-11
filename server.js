const express = require('express');
const hbs = require('hbs');
const favicon = require('serve-favicon');

process.env.PORT = 3000;
const port = process.env.PORT;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   const now = new Date().toString();
//
//   const log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile('server.log', log + '\n');
//
//   next();
// });

// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//     welcomeMessage: 'The site is currently been updated',
//     pageTitle: 'Maintenance page'
//   });
// });

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.all('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my beautiful page',
    name: 'Marcis',
    likes: ['Biking', 'Cities'],
    pageTitle: 'Home page',
  });
});

app.all('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.all('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
    projectsPage: 'Projects page'
  });
});

app.all('/bad', (req, res) => {
  res.send({errorMessage: 'Bad page'});
});

app.listen(port, () => console.log(`Server is up on port ${port}`));