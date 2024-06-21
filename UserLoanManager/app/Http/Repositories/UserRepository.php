<?php
namespace App\Http\Repositories;
use App\Models\User;
use App\Traits\JsonOperations;

class UserRepository
{
    use JsonOperations;

    private $filePath;

    public function __construct() {
        $this->filePath = __DIR__.'/../../../public/json/users.json';
    }

    public function getAllUser(){
        return $this->readFile();
    }

    public function getOneUser(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $aut) {
            if ($aut->id == $id) {
                return $data[$i];
            }
        }
        return null;
    }

    public function addUser(User $user) {
        $data = $this->readFile();
        $data[] = $user;

        $this->saveFile($data);
    }

    public function updateUser(int $id, User $user) {
        $data = $this->readFile();
        foreach ($data as $i => $us) {
            if ($us->id == $id) {
                $data[$i] = $user;
            }
        }
        $this->saveFile($data);
    }

    public function deleteUser(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $us) {
            if ($us->id == $id) {
                unset($data[$i]);
            }
        }
        $this->saveFile($data);
    }
}
