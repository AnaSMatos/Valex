import {findByCardId, insert} from "../repositories/rechargeRepository.js"
import { findById } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function recharge(id: number, apiKey: string, amount: number){
    //confere se a api key existe
    const validApi = await findByApiKey(apiKey)
    if(!validApi){
        throw{
            type: "notFound",
            message: "Company not found"
        }
    }

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

    const data = {
        cardId: id,
        amount
    }

    await insert(data)
}
