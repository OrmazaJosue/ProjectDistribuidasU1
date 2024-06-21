<?php
namespace App\Http\Repositories;
use App\Models\Book;
use App\Traits\JsonOperations;


class BookRepository
{
    use JsonOperations;

    private $filePath;

    public function __construct() {
        $this->filePath = __DIR__.'/../../../public/json/books.json';
    }

    public function getAll() {
        return $this->readFile();
    }

    public function getOne(string $isbn){
        $data = $this->readFile();
        foreach ($data as $i => $boo) {
            if ($boo->isbn == $isbn) {
                return $data[$i];
            }
        }
        return null;
    }

    public function addBook(Book $book) {
        $data = $this->readFile();
        $data[] = $book;

        $this->saveFile($data);
    }

    public function updateBook(string $isbn, Book $book) {
        $data = $this->readFile();
        foreach ($data as $i => $boo) {
            if ($boo->isbn == $isbn) {
                $data[$i] = $book;
            }
        }
        $this->saveFile($data);
    }

    public function deleteBook(string $isbn){
        $data = $this->readFile();
        foreach ($data as $i => $aut) {
            if ($aut->isbn == $isbn) {
                unset($data[$i]);
            }
        }
        $this->saveFile($data);
    }
}

