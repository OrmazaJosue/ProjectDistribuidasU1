<?php
namespace App\Http\Services;
use App\Http\Repositories\UserRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
    }

    public function getAllUser(){
        return $this->userRepository->getAllUser();
    }

    public function getOneUser(int $id){
        return $this->userRepository->getOneUser($id);
    }

    public function createUser(array $data){
        $user = new User();
        $user->id = $data['id'];
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->birthdate = $data['birthdate'];
        $user->address = $data['address'];
        $user->phone_number = $data['phone_number'];
        /*$user->role_id = $data['role_id'];*/
        $this->userRepository->addUser($user);
    }

    public function updateUser(int $id, array $data){
        $user = new User();
        $user->id = $id;
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->birthdate = $data['birthdate'];
        $user->address = $data['address'];
        $user->phone_number = $data['phone_number'];
        $this->userRepository->updateUser($id, $user);
    }

    public function deleteUser(int $id){
        $this->userRepository->deleteUser($id);
    }
}
