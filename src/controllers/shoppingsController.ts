import { Request, Response } from "express";
import {buy} from "../services/shopServices.js"

export async function shop(req: Request, res: Response){
    const {id} = req.params
    const {password, businessId, amount} = req.body

    await buy(password, businessId, amount, Number(id))

    res.sendStatus(200)

    // password: string, businessId: number, amount: number, id: number


    // posta assim: {cardId, businessId, amount}
    // rn = cadastrado, ativo, não expirado, não bloqueado, ver senha,
    // ver estabeleciento (se esta cadastrado), se estabelecimento e cartao sao do mesmo tipo,
    // se o cartao possui saldo suficiente, persistir a compra
}