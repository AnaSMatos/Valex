import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";


export async function createCard(req: Request, res: Response){
    const {employeeId, type} : {employeeId: number, type: TransactionTypes} = req.body
    const apiKey = req.headers["x-api-key"].toString();

    await cardServices.createCard(apiKey, employeeId, type)

    res.sendStatus(201)
} 


export async function activateCard(req: Request, res: Response){
    const {id, securityCode, password} : {id: number, securityCode: string, password: string} = req.body
    
    await cardServices.activateCard(id, securityCode, password)

    res.sendStatus(200)
}

export async function viewTransactions(req: Request, res: Response){
    //o que recebo: id do cartao (n entendi, só? eu colocaria tb a senha)
    // {
    //     "balance": 35000,
    //     "transactions": [
    //           { "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
    //       ]
    //     "recharges": [
    //           { "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
    //       ]
    //   }
    // rn = cartao cadastrado, balance: recharges - transactions
}

export async function blockCard(req: Request, res: Response){
    // recebo: id do cartao, senha do cartao
    // update no cartao, isBlocked = true
    // rn = cartao cadastrado, não expirado, não bloqueado, ver senha
}

export async function unblockCard(req: Request, res: Response){
    //recebo: id e senha
    // rn = cartao cadastrado, não expirado, bloqueado, ver senha
}