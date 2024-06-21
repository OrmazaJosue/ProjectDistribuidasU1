import Service from "./service"

class BookService extends Service
{
    constructor() {
        super('books', 'http://bookauthormanager.test')
    }
}

const bookService = new BookService()

export default bookService;