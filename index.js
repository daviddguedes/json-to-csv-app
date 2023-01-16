const express = require('express');
const { engine } = require('express-handlebars');
const converter = require('./lib/json_csv');

const app = express();

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
  try {
    const { json_to_csv } = req.body;
    const formatted = JSON.parse(json_to_csv);

    converter.json2csv(formatted, (err, csv) => {
      if (err) {
        throw err;
      }

      res.render('home', { success: true, filecontent: csv });
    });
  } catch (error) {
    console.log(error.message);
    res.render('home', { success: false, error: 'There are issues in your json file.' });
  }
});

app.listen(8888, () => {
  console.log(`Go to http://localhost:8888`);
});