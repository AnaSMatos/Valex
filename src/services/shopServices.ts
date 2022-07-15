import {findByCardId as findPaymentById, insert} from "../repositories/paymentRepository.js"
import {findByCardId as findRechargeById} from "../repositories/rechargeRepository.js"
import { findById } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById as findBusinessById } from "../repositories/businessRepository.js";
import bcrypt from "bcrypt"

export async function buy(password: string, businessId: number, amount: number, id: number){
    //cartao esta cadastrado
    const cardInfo = await findById(id)
    if(!cardInfo){
        throw{
            type: "notFound",
            message: "Card not found"
        }
    }

    //se ja esta ativo
    if(cardInfo.password){
        throw{
            type: "conflict",
            message: "The card you are trying to activate is already active"
        }
    }

    //se expirou
    const cardExpiration = new Date(`01/${cardInfo.expirationDate}`)
    const today = new Date()
    if(cardExpiration <= today){
        throw{
            type: "badRequest",
            message: "This card has expired"
        }
    }

    //se bloquado
    if(cardInfo.isBlocked === true){
        throw{
            type: "conflict",
            message: "The card is already blocked"
        }
    }

    //confere senha
    const checkPassword = bcrypt.compareSync(password, cardInfo.password)

    if(!checkPassword){
        throw{
            type: "unauthorized",
            message: "Wrong password"
        }
    }
    //confere se estabelecimento esta cadastrado
    const businessInfo = await findBusinessById(businessId)
    if(!businessInfo){
        throw{
            type: "notFound",
            message: "Business not found"
        }
    }
    //confere os tipos
    if(cardInfo.type != businessInfo.type){
        throw{
            type: "unauthorized",
            message: "The business is not the same type as the card"
        }
    }

    //conta o saldo
    const getRecharges = await findRechargeById(id)
    const getPayments = await findPaymentById(id)

    let balance = 0

    getRecharges.forEach(item => balance -= item.amount)
    getPayments.forEach(item => balance += item.amount)

    if(balance < amount){
        throw{
            type: "unauthorized",
            message: "Insufficient funds"
        }
    }

    const data = {
        cardId: id,
        amount,
        businessId: 3
    }

    await insert(data)
}
