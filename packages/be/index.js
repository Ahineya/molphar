const express = require('express');

const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/email', (req, res) => {
  console.log('Email sent!', req.body);
  res.json({
    success: true
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
