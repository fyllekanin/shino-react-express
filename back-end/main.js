const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));


let value = 'empty';

app.put('/update-value', (req, res) => {
console.log(req.body.value);
    value = req.body.value;
    res.json();
});

app.get('/get-value', (req, res) => {
  res.json({ value: value });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

