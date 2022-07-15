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
    const {id: cardId} = req.params
    const {securityCode, password} : {securityCode: string, password: string} = req.body

    await cardServices.activateCard(Number(cardId), securityCode, password)

    res.sendStatus(200)
}

export async function viewTransactions(req: Request, res: Response){
    const {id} = req.params

    const transactions = await cardServices.viewTransactions(Number(id))

    res.send(transactions)
}

export async function blockCard(req: Request, res: Response){
    const {id} = req.params
    const {password} = req.body

    await cardServices.blockCard(Number(id), password)

    res.sendStatus(200)
}

export async function unblockCard(req: Request, res: Response){
    const {id} = req.params
    const {password} = req.body

    await cardServices.unblockCard(Number(id), password)

    res.sendStatus(200)
}