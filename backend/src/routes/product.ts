import { Router } from 'express';
import { validateProductBody } from '../middlewares/validatons';
import { getProducts, createProduct } from '../controllers';

export const productRouter = Router();
productRouter.get('/product', getProducts);
productRouter.post('/product', validateProductBody, createProduct);
