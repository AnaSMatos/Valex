import { TransactionTypes, findByTypeAndEmployeeId, insert } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import {findById} from "../repositories/employeeRepository.js"
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dotenv from "dotenv"



dotenv.config({path: ".env"})
const cryptr = new Cryptr(process.env.CRYPTR_KEY)

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

const cardServices = {
    createCard
}

export default cardServices;