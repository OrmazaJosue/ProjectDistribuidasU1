<?php
namespace App\Http\Repositories;
use App\Models\Author;
use App\Traits\JsonOperations;

class AuthorRepository
{
    use JsonOperations;

    private $filePath;

    public function __construct() {
        $this->filePath = __DIR__.'/../../../public/json/authors.json';
    }

    public function getAll()
    {
        return $this->readFile();
    }

    public function getOne(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $aut) {
            if ($aut->id == $id) {
                return $data[$i];
            }
        }
        return null;
    }

    public function addAuthor(Author $author) {
        $data = $this->readFile();
        $data[] = $author;

        $this->saveFile($data);
    }

    public function updateAuthor(int $id, Author $author) {
        $data = $this->readFile();
        foreach ($data as $i => $aut) {
            if ($aut->id == $id) {
                $data[$i] = $author;
            }
        }
        $this->saveFile($data);
    }

    public function deleteAuthor(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $aut) {
            if ($aut->id == $id) {
                unset($data[$i]);
            }
        }
        $this->saveFile($data);
    }
}
