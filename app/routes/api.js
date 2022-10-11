import express from'express';
import {
  getAllProducts,
  getLastProduct,
  addProduct,
  removeImage,
  deleteProduct,
  updateProduct
} from '../../app/controllers/ProductController.js';
import {
  getCart,
  allCart,
  addFirstCart,
  addNextCart,
  statusCart,
  cookieAgree
} from '../../app/controllers/CartController.js';
import {registration, login} from '../../app/controllers/AuthController.js';
import { getUsers, userRole, removeUser } from '../../app/controllers/UserController.js';
import authMiddleware from '../../app/middleware/authMiddleware.js';
import uploadMiddleware from '../../app/middleware/uploadMiddleware.js';

export const router = express.Router();

router.post('/api/registration', registration);
router.post('/api/login', login);
router.get('/api/users', authMiddleware, getUsers);
router.put('/api/user-role', authMiddleware, userRole);
router.delete('/api/user-remove/:id', authMiddleware, removeUser);

router.get('/api/all-products', getAllProducts);
router.get('/api/last-product', getLastProduct);
router.post('/api/create-product', authMiddleware, uploadMiddleware.single('image'), addProduct);
router.delete('/api/delete-image/:image', authMiddleware, removeImage);
router.delete('/api/delete-product/:id', authMiddleware, deleteProduct);
router.put('/api/update-product/', authMiddleware, updateProduct);

router.get('/api/all-cart', allCart);
router.get('/api/get-cart/:id', getCart )
router.post('/api/add-first-cart', addFirstCart);
router.put('/api/add-cart', addNextCart);
router.put('/api/status-cart', authMiddleware, statusCart);
router.post('/api/message-cookie-agree', cookieAgree);

