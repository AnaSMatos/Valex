import { Request, Response } from "express";

export async function rechargeCard(req: Request, res: Response){
    //recebo: apikey da empresa, id do cartao
    //postar a recarga assim: {
    //     id (auto)
    //     timeStamp(auto)
    //     cardId
    //     amount
    // }
    // 
    //val = valores apenas acima de 0
    //rn = cadastrado, ativo, não expirado, persistir recarga 
}
