import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardsController.js";

const cardRouter = Router()

cardRouter.post("/card", createCard)
cardRouter.put("/card", activateCard)

export default cardRouter;