import { Router } from "express";
import { createCard, activateCard, viewTransactions } from "../controllers/cardsController.js";
import {validateSchema} from "../middlewares/validateSchema.js"
import cardSchema from "../schemas/cardSchema.js"
import activateSchema from "../schemas/activateSchema.js"

const cardRouter = Router()

cardRouter.post("/card", validateSchema(cardSchema), createCard)
cardRouter.patch("/card", validateSchema(activateSchema), activateCard)
cardRouter.get("/card/:id/transactions", viewTransactions)
cardRouter.post("/card/:id/lock")
cardRouter.post("/card/:id/unlock")

export default cardRouter;