import express from 'express';
import productController from '../controllers/productController';

const router = express();

// Route to get all products
router.get('/', productController.getAll);

// Route to get a product by ID
router.get('/:id', productController.getById);

// Route to create a new product
router.post('/', productController.create);

// Route to update a product by ID
router.put('/:id', productController.update);

// Route to delete (soft delete) a product by ID
router.delete('/:id', productController.deleted);

export default router;
