import Joi from "joi";

const cardSchema = Joi.object({
    employeeId: Joi.number().required(),
    type: Joi.string().required().valid(
        'groceries', 'restaurant', 'transport', 'education', 'health'
    )
})

export default cardSchema;