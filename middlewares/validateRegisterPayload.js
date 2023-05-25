import Joi from 'joi';

export default (req, res, next) => {

  const userRegisterSchema = Joi.object({
    firstname: Joi.string()
      .min(2)
      .max(25)
      .required(),
    lastname: Joi.string()
      .min(2)
      .max(25)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(3)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  })

  const { error } = userRegisterSchema.validate(req.body, { abortEarly: false });

  if (error)

    return res.status(400).send({ registerFormValidate: false, error: error.details });

  next();
};    