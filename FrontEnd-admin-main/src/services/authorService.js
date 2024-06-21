import Service from "./service"

class AuthorService extends Service
{
    constructor() {
        super('authors', 'http://bookauthormanager.test')
    }
}

const authorService = new AuthorService()

export default authorService;