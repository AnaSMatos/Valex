import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js"
import valueSchema from "../schemas/cardSchema.js";
import { rechargeCard } from "../controllers/rechargesController.js";

const rechargeRouter = Router()

rechargeRouter.post("recharge/:id",validateSchema(valueSchema), rechargeCard)

export default rechargeRouter;