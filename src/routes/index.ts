import { Router } from "express";
import cardRouter from "./cardsRoute.js"
import rechargeRouter from "./rechargesRoute.js";

const router = Router()

router.use(cardRouter)
router.use(rechargeRouter)

export default router;

