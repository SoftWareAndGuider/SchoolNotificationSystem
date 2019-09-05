const PORT = process.env.serPort || 80

const fs = require('fs')
const data = require('./data/data.json')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(data)
})

app.get('/info/:grade', (req, res) => {
  const temp = data[req.params.grade - 1]
  if (temp) res.send(temp)
  else res.sendStatus(404)
})

app.get('/info/:grade/:class', (req, res) => {
  const temp = data[req.params.grade - 1][req.params.class - 1]
  if (temp) res.send(temp)
  else res.sendStatus(404)
})

app.get('/send/msg/:grade/:class/:content', (req, res) => {
  const temp = data[req.params.grade - 1][req.params.class - 1]
  if (temp) {
    data[req.params.grade - 1][req.params.class - 1].read = false
    data[req.params.grade - 1][req.params.class - 1].isFile = false
    data[req.params.grade - 1][req.params.class - 1].detail.time = Date.now()
    data[req.params.grade - 1][req.params.class - 1].detail.filePath = null
    data[req.params.grade - 1][req.params.class - 1].detail.message = req.params.content

    fs.writeFile('./data/data.json', JSON.stringify(data), (err) => {
      if (err) res.send(err)
      else res.sendStatus(200)
    })
  } else res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log('Server is now on at http://localhost:' + PORT)
})
