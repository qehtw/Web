import express from 'express';
import groceryRoutes from './routes/groceries.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api/groceries', groceryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('http://127.0.0.1:3000')
});