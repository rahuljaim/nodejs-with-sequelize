const express = require('express');
const bodyParser = require('body-parser');

const {engine} = require('express-handlebars');
const path = require('path');

const db = require('./config/database');

// Test the connection
db
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));


const app = express();

// handlebars middleware
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('INDEX'));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});