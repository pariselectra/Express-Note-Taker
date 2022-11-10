const PORT = process.env.PORT || 3001;

const express = require('express');

const path = require('path');
const fs = require('fs');

const db = require('./db/db.json')

// Identifies unique ids
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');



const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// app.post('/notes', (req, res) =>
//   // Create a note
// );

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req, res) =>{
  const data = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }
  db.push(data);
  fs.writeFile('./db/db.json', JSON.stringify(db), ()=> {
    res.json(data);
  })
});


// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);