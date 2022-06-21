import Joi from "joi";

export const SignupSchema = Joi.object().keys({
  email: Joi.string()
    .label("Email")
    .required()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }),
});

export const LoginSchema = Joi.object().keys({
  email: Joi.string()
    .label("Email")
    .required()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }),
  password: Joi.string().label("Password").required(),
});
