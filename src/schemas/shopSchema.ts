import Joi from "joi";

const shopSchema = Joi.object({
    password: Joi.string().required(),
    businessId: Joi.number().required(),
    amount: Joi.number().required().greater(0)
})

export default shopSchema;