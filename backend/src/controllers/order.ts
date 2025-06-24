import { Error as MongooseError, Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { faker } from '@faker-js/faker';
import { BadRequestError } from '../errors';
import Product, { IProduct } from '../models/product';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items } = req.body;
    const basket:IProduct[] = [];
    const products = await Product.find({});
    let totalPrice = 0;
    items.forEach((id: Types.ObjectId) => {
      const product = products.find((p) => p._id.equals(id));
      if (!product) return next(new BadRequestError(`Товар не найден id=${id}`));
      if (product.price === null) return next(new BadRequestError(`Товар не продаётся id=${id}`));
      totalPrice += product.price;
      return basket.push(product);
    });
    if (totalPrice !== total) return next(new BadRequestError('Стоимость заказа не соответствует стоимости товаров.'));
    return res.status(constants.HTTP_STATUS_OK).json({
      id: faker.string.uuid(),
      total,
    });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};
