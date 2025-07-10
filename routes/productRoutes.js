import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProductById,
  getUniqueCategories,
  getProductsGroupedByCategory
} from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/categories/unique', getUniqueCategories);
router.get('/categories/grouped', getProductsGroupedByCategory);

export default router;
