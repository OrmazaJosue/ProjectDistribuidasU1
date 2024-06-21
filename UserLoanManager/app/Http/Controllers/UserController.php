<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function options()
    {
    }

    public function index()
    {
        return $this->successResponse($this->userService->getAllUser());
    }

    public function show($id)
    {
        return $this->successResponse($this->userService->getOneUser($id));
    }

    public function store(Request $request)
    {
        $rules = [
            'id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'birthdate' => 'required|date',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15'
        ];

        $messages = [
            'id.required' => 'El ID es obligatorio.',
            'id.integer' => 'El ID debe ser un número entero.',
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo válida.',
            'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'address.required' => 'La dirección es obligatoria.',
            'address.string' => 'La dirección debe ser una cadena de texto.',
            'address.max' => 'La dirección no debe exceder los 255 caracteres.',
            'phone_number.required' => 'El número de teléfono es obligatorio.',
            'phone_number.string' => 'El número de teléfono debe ser una cadena de texto.',
            'phone_number.max' => 'El número de teléfono no debe exceder los 15 caracteres.'
        ];

        $this->validate($request, $rules, $messages);

        $this->userService->createUser($request->all());
        return $this->successResponse('Se ha creado un nuevo usuario :)');
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'birthdate' => 'required|date',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15'
        ];

        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo válida.',
            'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
            'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'address.required' => 'La dirección es obligatoria.',
            'address.string' => 'La dirección debe ser una cadena de texto.',
            'address.max' => 'La dirección no debe exceder los 255 caracteres.',
            'phone_number.required' => 'El número de teléfono es obligatorio.',
            'phone_number.string' => 'El número de teléfono debe ser una cadena de texto.',
            'phone_number.max' => 'El número de teléfono no debe exceder los 15 caracteres.'
        ];

        $this->validate($request, $rules, $messages);

        $this->userService->updateUser($id, $request->all());
        return $this->successResponse('Se ha actualizado el usuario :)');
    }
    public function destroy($id)
    {
        $this->userService->deleteUser($id);
        return $this->successResponse('Se ha eliminado el usuario :)');
    }
}
