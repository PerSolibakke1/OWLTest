import { login, readClass, readAllClasses, insertClass } from './database.js';
import express from 'express';

const app = express()
const port = 3000

await login();

app.get('/', async (req, res) => {
    res.send('hello');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})