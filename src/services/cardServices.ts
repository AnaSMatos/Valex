import { TransactionTypes, findByTypeAndEmployeeId, insert, findById as findCardById, update } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import {findById} from "../repositories/employeeRepository.js"
import {findByCardId as findPaymentById, insert as insertPayment} from "../repositories/paymentRepository.js"
import {findByCardId as findRechargeById, insert as insertRecharge} from "../repositories/rechargeRepository.js"
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const cryptr = new Cryptr(process.env.CRYPTR_KEY)

const passwordFormat = /^[0-9]{4}$/; 

async function createCard(apiKey: string, employeeId: number, type: TransactionTypes){
    //confere se a api key existe
    const validApi = await findByApiKey(apiKey)
    if(!validApi){
        throw{
            type: "notFound",
            message: "Company not found"
        }
    }

    //confere se o funcionario esta cadastrado
    const validEmployee = await findById(employeeId)
    if(!validEmployee){
        throw{
            type: "notFound",
            message: "Employee not found"
        }
    }

    //confere se o funcionario tem um cartao do mesmo tipo
    const sameType = await findByTypeAndEmployeeId(type, employeeId)

    if(sameType){
        throw{
            type: "conflict",
            message: "Employee already has a card from this type"
        }
    }

    //cria o numero e codigo de seguranca do cartão
    const number = faker.finance.creditCardNumber('#### #### #### ####');
    const securityNumber = faker.finance.creditCardCVV();
    const securityCode = cryptr.encrypt(securityNumber)
    
    //define a data de expiração do cartao 
    let today = new Date()
    const mm = String(today.getMonth() + 1)
    const yy = String(today.getFullYear()+5)
    const expirationDate = `${mm}/${yy.slice(2,4)}`

    //cria o nome do cartão no formato desejado
    const employeeName = (validEmployee.fullName).split(" ");
    const removeSmallNames = employeeName.filter((name) => name.length > 3)
    const cardName = removeSmallNames.map((name, index) => {
        if (name.length > 3){
            if(index === 0 || index === removeSmallNames.length - 1){
                return name 
            }
            return name[0]
        }
    })

    const cardHolderName = cardName.join(" ")


    const data = {
        employeeId,
        number,
        cardholderName: cardHolderName,
        securityCode,
        expirationDate,
        password: null ,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    }

    await insert(data)
}

async function activateCard(id: number, securityCode: string, password: string){
    
    //cartao esta cadastrado
    const cardInfo = await findCardById(id)
    if(!cardInfo){
        throw{
            type: "notFound",
            message: "Card not found"
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
    //se ja esta ativo
    if(cardInfo.password){
        throw{
            type: "conflict",
            message: "The card you are trying to activate is already active"
        }
    }
    //se o security code dá match
    const cardSecurityCode = cryptr.decrypt(cardInfo.securityCode)
    if (cardSecurityCode != securityCode){
        throw{
            type: "badRequest",
            message: "Wrong security code"
        }
    }

    if(!passwordFormat.test(password)){
        throw{
            type: "badRequest",
            message: "The password must have four numbers."
        }
    }
    //encriptar a senha
    const encryptedPassword = bcrypt.hashSync(password, 10)
    //fim
    await update(id, {password: encryptedPassword})
}

async function viewTransactions(id: number){
    //cartao esta cadastrado
    const cardInfo = await findCardById(id)
    if(!cardInfo){
        throw{
            type: "notFound",
            message: "Card not found"
        }
    }

    const getRecharges = await findRechargeById(id)
    const getPayments = await findPaymentById(id)

    let balance = 0

    getRecharges.forEach(item => balance -= item.amount)
    getPayments.forEach(item => balance += item.amount)

    const result = {
        balance,
        transactions: getPayments.map(item => {return {
            id: item.id, cardId: item.cardId, businessId: item.businessId, businessName: item.businessName, timestamp: item.timestamp, amount: item.amount
        }}),
        recharges: getRecharges.map(item => {return {
            id: item.id, cardId: item.cardId, timestamp: item.timestamp, amount: item.amount
        }})
    }

    return result;
}

async function blockCard(id: number, password: string){
    //cartao esta cadastrado
    const cardInfo = await findCardById(id)
    if(!cardInfo){
        throw{
            type: "notFound",
            message: "Card not found"
        }
    }
    //se bloquado
    if(cardInfo.isBlocked === true){
        throw{
            type: "conflict",
            message: "The card is already blocked"
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
    //confere senha
    const checkPassword = bcrypt.compareSync(password, cardInfo.password)

    if(!checkPassword){
        throw{
            type: "unauthorized",
            message: "Wrong password"
        }
    }

    await update(id, {isBlocked: true})
}

async function unblockCard(id: number, password: string){
    //cartao esta cadastrado
    const cardInfo = await findCardById(id)
    if(!cardInfo){
        throw{
            type: "notFound",
            message: "Card not found"
        }
    }
    //se bloquado
    if(cardInfo.isBlocked === false){
        throw{
            type: "conflict",
            message: "The card is already unblocked"
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
    //confere senha
    const checkPassword = bcrypt.compareSync(password, cardInfo.password)

    if(!checkPassword){
        throw{
            type: "unauthorized",
            message: "Wrong password"
        }
    }

    await update(id, {isBlocked: false})
}

const cardServices = {
    createCard,
    activateCard,
    viewTransactions,
    blockCard,
    unblockCard
}

export default cardServices;