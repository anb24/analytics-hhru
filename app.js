const express = require('express')
const app = express()
const port = 3033

const data = require('./data_hh.json')

const data1 = data.

console.log(data1)


app.get('/', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`Стартует на ${port}`)
})