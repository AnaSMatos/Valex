import { Request, Response } from "express";
import {recharge} from "./../services/rechargeService.js"

export async function rechargeCard(req: Request, res: Response){
    const {id} = req.params
    const {amount} = req.body
    const apiKey = req.headers["x-api-key"].toString();

    await recharge(Number(id), apiKey, amount)

    res.sendStatus(201)
}
