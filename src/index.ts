import express from 'express';
import parkingRoutes from './routes/parkingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/parking', parkingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
