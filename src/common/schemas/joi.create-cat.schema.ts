import Joi from 'joi';

export const createCatSchema = Joi.object({
  id: Joi.number().min(1).required(),
  name: Joi.string().min(2).required(),
  age: Joi.number().min(1).required(),
  breed: Joi.string().min(3).required(),
});
