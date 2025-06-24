import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import { BadRequestError, ConflictError } from '../errors';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => Product.find({})
  .then((products) => {
    res.status(constants.HTTP_STATUS_OK)
      .send({ items: products, total: products.length });
  })
  .catch((error) => next(error));

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title, description, category, price, image,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      image,
      category,
      price,
    });
    return res.status(constants.HTTP_STATUS_CREATED).send(product);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Такой товар уже существует'));
    }
    return next(error);
  }
};
