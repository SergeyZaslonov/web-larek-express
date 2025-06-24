import { Router } from 'express';
import { validateOrderBody } from '../middlewares/validatons';
import { createOrder } from '../controllers';

export const orderRouter = Router();
orderRouter.post('/order', validateOrderBody, createOrder);
