import express from 'express';
import { getAllGroceries, addGrocery, editGrocery } from '../controllers/groceriesController.js';

const router = express.Router();

router.get('/', getAllGroceries);
router.post('/', addGrocery);
router.put('/:id', editGrocery);

export default router;

