import express from 'express';
import { OK } from 'zod/v3';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
})

export default app;