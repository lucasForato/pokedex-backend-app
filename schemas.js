const Joi = require("joi");

const user_schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
});

module.exports = user_schema;
