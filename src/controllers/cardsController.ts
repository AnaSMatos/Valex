import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";


export async function createCard(req: Request, res: Response){
    const {employeeId, type} : {employeeId: number, type: TransactionTypes} = req.body
    const apiKey = req.headers["x-api-key"].toString();

    await cardServices.createCard(apiKey, employeeId, type)
    // val = chave vem de x-api-key (header), type = 'groceries' || 'restaurant' || 'transport' || 'education' || 'health'

    res.sendStatus(201)
} 


export async function activateCard(req: Request, res: Response){
    // update no cartao com id, infos recebidas: id, cvc, senha q o usuario quer usar
    // estrutura mesma da função de cima
    // rn = cartao cadastrado, não expirado, não ativo, cvc veridficado, senha de 4 numeros, senha criptografada
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