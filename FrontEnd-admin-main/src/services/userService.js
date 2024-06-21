import Service from "./service"

class UserService extends Service
{
    constructor() {
        super('users', 'http://userloanmanager.test/')
    }
}

const userService = new UserService()

export default userService;