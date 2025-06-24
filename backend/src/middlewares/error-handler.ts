import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message = 'Ошибка на сервере' } = err;
  res.status(statusCode).json({ message });
};

export default errorHandler;
