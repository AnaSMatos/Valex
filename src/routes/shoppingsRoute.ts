import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import shopSchema from "../schemas/shopSchema.js"
import valueSchema from "../schemas/cardSchema.js";
import { shop } from "../controllers/shoppingsController.js";

const shopRouter = Router()

shopRouter.post("recharge/:id", validateSchema(valueSchema), validateSchema(shopSchema), shop)

export default shopRouter;