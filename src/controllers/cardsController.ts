import { Request, Response } from "express";


export async function createCard(req: Request, res: Response){
    // post nos cards, infos recebidas: employeeId, tipo, e a chave da empresa (q deve ser valida)
    // {
    //     id - gera automatico
    //     empoyeeId - aqui vem o id do funcionario dono do cartao 
    //     number - faker
    //     cardHolderName - nome no formato fistname + middlename initials + lastname
    //     securityCode - guardado de forma criptografada (gerar pela bib faker, cript pega cryptr)
    //     expirationDate - data d hoje ams 5 anos a frente no formato MM/YY
    //     password - null 
    //     isVirtual - false (default) 
    //     originalCardId - null 
    //     isBlocked - false (default)
    //     type - tipo do cartao 
    // }
    // val = chave vem de x-api-key (header), type = 'groceries' || 'restaurant' || 'transport' || 'education' || 'health'
    // rn = api key valida, empregado cadastrado, empregado nao ter um cartao do msm tipo,
    // nome do cartao, exp date +5 anos, cvc gerado c faker, criptograf com cryptr
} 

export async function activateCard(req: Request, res: Response){
    // update no cartao com id, infos recebidas: id, cvc, senha q o usuario quer usar
    // estrutura mesma da função de cima
    // rn = cadastrado, não expirado, não ativo, cvc veridficado, senha de 4 numeros, senha criptografada
}

export async function viewCard(req: Request, res: Response){
    //infos recebidas: id do empregado, senha dos cartões
    // imagino q assim: {
    //     employeeId
    //     passwords: []
    // }
    // estrutura devolvida
    // {
    //     "cards": [{
    //      "number": 5595 5595 5595 5595,
    //      "cardholderName": "FULANO N SILVA",
    //        "expirationDate": "04/30",
    //      "securityCode": "397"
    //     }]
    //}
    // rn = cadastrado, ativo, senha veridicado 
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
    // rn = cadastrado, balance: recharges - transactions
}

export async function blockCard(req: Request, res: Response){
    // recebo: id do cartao, senha do cartao
    // update no cartao, isBlocked = true
    // rn = cadastrado, não expirado, não bloqueado, ver senha
}

export async function unblockCard(req: Request, res: Response){
    //recebo: id e senha
    // rn = cadastrado, não expirado, bloqueado, ver senha
}