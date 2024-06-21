<?php
namespace App\Http\Services;
use App\Http\Repositories\AuthorRepository;
use App\Models\Author;

class AuthorService {
    private AuthorRepository $authorRepository;

    public function __construct(AuthorRepository $authorRepository) {
        $this->authorRepository = $authorRepository;
    }

    public function getAll(){
        return $this->authorRepository->getAll();
    }

    public function getOne(int $id){
        return $this->authorRepository->getOne($id);
    }

    public function createAuthor(array $data){
        $author = new Author();
        $author->id = $data['id'];
        $author->first_name = $data['first_name'];
        $author->last_name = $data['last_name'];
        $author->birthdate = $data['birthdate'];
        $author->nationality = $data['nationality'];
        $author->biography = $data['biography'];
        $author->website = $data['website'];

        $this->authorRepository->addAuthor($author);
    }

    public function updateAuthor(int $id, array $data){
        $author = new Author();
        $author->id = $id;
        $author->first_name = $data['first_name'];
        $author->last_name = $data['last_name'];
        $author->birthdate = $data['birthdate'];
        $author->nationality = $data['nationality'];
        $author->biography = $data['biography'];
        $author->website = $data['website'];

        $this->authorRepository->updateAuthor($id, $author);
    }
    public function deleteAuthor(int $id){
        $this->authorRepository->deleteAuthor($id);
    }
}


