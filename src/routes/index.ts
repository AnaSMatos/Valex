import { Router } from "express";
import cardRouter from "./cardsRoute.js"

const router = Router()

router.use(cardRouter)

export default router;
