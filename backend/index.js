import { login, readClass, readAllClasses, insertClass } from './database.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

await login();

app.get('/', async (req, res) => {
    const data = await readAllClasses();
    res.json(data);
});

app.get('/class/:className', async (req, res) => {
    const data = await readClass(req.params.className); 
    res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})