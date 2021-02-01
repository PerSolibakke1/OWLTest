const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

const url = 'http://localhost:7200/repositories/wineTest?query=PREFIX%20%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2FTR%2F2003%2FPR-owl-guide-20031209%2Fwine%23%3E%0ASELECT%20%3FWine%20%3FMaker%0AWHERE%20%7B%0A%09%3FWine%20%3AhasBody%20%3AFull%20.%0A%20%20%20%20%3FWine%20%3AhasMaker%20%3FMaker%20.%0A%7D%20LIMIT%20100';

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