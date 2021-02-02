const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

const url = 'http://localhost:7200/test';

app.get('/', async (req, res) => {
    const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(foo => foo.json()); 
    res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})