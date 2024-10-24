import express from 'express';
import { getAllGroceries, addGrocery, editGrocery, deleteGrocery } from '../controllers/groceriesController.js';

const router = express.Router();

// Інші маршрути...
router.get('/', getAllGroceries);
router.post('/', addGrocery);
router.put('/:id', editGrocery);
router.delete('/:id', deleteGrocery);

export default router;
