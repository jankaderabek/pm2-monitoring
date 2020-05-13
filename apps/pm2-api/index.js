const express = require('express')
const pm2 = require('pm2')

const app = express()
const port = 3004

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/pm2', (req, res) => {
  pm2.list(function (err, processes) {
    res.send(processes)

    pm2.disconnect()
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
