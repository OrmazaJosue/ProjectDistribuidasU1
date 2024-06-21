import Service from "./service"

class LoanService extends Service
{
    constructor() {
        super('loans', 'http://userloanmanager.test/')
    }
}

const loanService = new LoanService()

export default loanService;