import Joi from 'joi';

export default (req, res, next) => {

  const userLoginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),

    password: Joi.string()
      .min(3)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  })

  const { error } = userLoginSchema.validate(req.body, { abortEarly: false });

  if (error)

    return res.status(400).send({ loginFormValidate: false, error: error.details });

  next();
};    