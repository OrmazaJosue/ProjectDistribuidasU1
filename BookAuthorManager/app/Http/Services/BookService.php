<?php
namespace App\Http\Services;
use App\Models\Book;

use App\Http\Repositories\BookRepository;

class BookService
{

    private BookRepository $bookRepository;

    public function __construct(BookRepository $bookRepository) {
        $this->bookRepository = $bookRepository;
    }

    public function getAll(){
        return $this->bookRepository->getAll();
    }

    public function getOne(string $isbn){
        return $this->bookRepository->getOne($isbn);
    }

    public function createBook(array $data){
        $book = new Book();
        $book->isbn = $data['isbn'];
        $book->title = $data['title'];
        $book->author_id = $data['author_id'];
        $book->publisher = $data['publisher'];
        $book->year = $data['year'];
        $book->price = $data['price'];
        $book->pages = $data['pages'];

        $this->bookRepository->addBook($book);
    }

    public function updateBook(string $isbn, array $data){
        $book = new Book();
        $book->isbn = $isbn;
        $book->title = $data['title'];
        $book->author_id = $data['author_id'];
        $book->publisher = $data['publisher'];
        $book->year = $data['year'];
        $book->price = $data['price'];
        $book->pages = $data['pages'];

        $this->bookRepository->updateBook($isbn, $book);
    }
    public function deleteBook(string $isbn){
        $this->bookRepository->deleteBook($isbn);
    }
}

