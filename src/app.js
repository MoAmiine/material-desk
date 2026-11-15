import express from 'express';
import { errorHandler } from './middlewares/error-handler.js'
import authRoutes from './routes/auth.routes.js'
import equipmentRoutes from './routes/equipment.routes.js';


const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'ok'});
})

app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);

app.use(errorHandler);

export default app;