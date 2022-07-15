import Joi from "joi";

const valueSchema = Joi.object({
    value: Joi.number().required().greater(0)
})

export default valueSchema;