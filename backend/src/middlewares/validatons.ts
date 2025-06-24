import { celebrate, Joi } from 'celebrate';

export const validateProductBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().max(30).min(2)
      .messages({
        'string.min': 'Минимальная длина поля title=2.',
        'string.max': 'Максимальная длина поля title=30.',
        'any.required': 'Поле title должно быть заполнено.',
      }),
    image: Joi.object()
      .required()
      .messages({ 'any.required': 'Поле image должно быть заполнено.' })
      .keys({
        fileName: Joi.string().required().messages({
          'any.required': 'Поле fileName должно быть заполнено.',
        }),
        originalName: Joi.string().required().messages({
          'any.required': 'Поле originalName должно быть заполнено.',
        }),
      }),
    category: Joi.string().required().messages({
      'any.required': 'Поле category должно быть заполнено.',
    }),
    price: Joi.number().allow(null),
  }),
});

export const validateOrderBody = celebrate({
  body: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required().messages({
      'any.required': 'Поле payment должно быть заполнено.',
      'any.only': 'Поле payment должно быть card или online.',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле email некоррекное значение.',
      'any.required': 'Поле email должно быть заполнено.',
    }),
    phone: Joi.string()
      .regex(/\+[0-9]+\s\(\d\d\d\)\s\d\d\d\s\d\d\s\d\d/i).required().messages({
        'string.pattern.base':
         'Поле телефона должно соответствовать шаблону +7 (999) 999-99-99.',
        'any.required': 'Поле phone должно быть заполнено.',
      }),
    address: Joi.string().required().min(4).max(100)
      .messages({
        'any.required': 'Поле address должно быть заполнено.',
        'string.min': 'Минимальная длина поля address=4.',
        'string.max': 'Максимальная длина поля address=100.',
      }),
    total: Joi.number().min(1).required().messages({
      'number.min': 'Нельзя оформить бесплатный заказ.',
    }),
    items: Joi.array().items(Joi.string()).required().min(1),
  }),
});
