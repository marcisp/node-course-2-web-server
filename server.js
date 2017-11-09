const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');




app.use((req, res, next) => {
  const now = new Date().toString();

  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');

  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//     welcomeMessage: 'The site is currently been updated',
//     pageTitle: 'Maintenance page'
//   });
// });

app.use(express.static(__dirname + '/public'));


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

app.all('/bad', (req, res) => {
  res.send({errorMessage: 'Bad page'});
});

app.listen(port, () => console.log(`Server is up on port ${port}`));