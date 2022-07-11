import { Request, Response } from "express";

export async function shop(req: Request, res: Response){
    //compra POS 
    //recebo: id cartao, senha cartao, id estabelecimento, valor compra
    //posta assim: {cardId, businessId, amount}
    //val: aceita só valor maior q zero no amount
    // rn = cadastrado, ativo, não expirado, não bloqueado, ver senha,
    // ver estabeleciento (se esta cadastrado), se estabelecimento e cartao sao do mesmo tipo,
    // se o cartao possui saldo suficiente, persistir a compra
}