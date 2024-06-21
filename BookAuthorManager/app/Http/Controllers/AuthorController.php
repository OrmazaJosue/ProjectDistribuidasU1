<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthorService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthorController extends Controller
{
    private AuthorService $authorService;

    public function __construct(AuthorService $authorService)
    {
        $this->authorService = $authorService;
    }

    public function options() { }

    public function index()
    {
        return $this->successResponse($this->authorService->getAll());
    }

    public function show($id)
    {
        return $this->successResponse($this->authorService->getOne($id));

    }

    public function store(Request $request)
{
    $rules = [
        'id' => 'required|integer',
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'birthdate' => 'required|date',
        'nationality' => 'required|string|max:255',
        'biography' => 'required|string',
        'website' => 'required|url'
    ];

    $messages = [
        'id.required' => 'El ID es obligatorio.',
        'id.integer' => 'El ID debe ser un número entero.',
        'first_name.required' => 'El nombre es obligatorio.',
        'first_name.string' => 'El nombre debe ser una cadena de texto.',
        'first_name.max' => 'El nombre no debe exceder los 255 caracteres.',
        'last_name.required' => 'El apellido es obligatorio.',
        'last_name.string' => 'El apellido debe ser una cadena de texto.',
        'last_name.max' => 'El apellido no debe exceder los 255 caracteres.',
        'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
        'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        'nationality.required' => 'La nacionalidad es obligatoria.',
        'nationality.string' => 'La nacionalidad debe ser una cadena de texto.',
        'nationality.max' => 'La nacionalidad no debe exceder los 255 caracteres.',
        'biography.required' => 'La biografía es obligatoria.',
        'biography.string' => 'La biografía debe ser una cadena de texto.',
        'website.required' => 'El sitio web es obligatorio.',
        'website.url' => 'El sitio web debe ser una URL válida.'
    ];

    $this->validate($request, $rules, $messages);

    $this->authorService->createAuthor($request->all());
    return $this->successResponse('Se ha creado un nuevo autor :)');
}

public function update(Request $request, $id)
{
    $rules = [
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'birthdate' => 'required|date',
        'nationality' => 'required|string|max:255',
        'biography' => 'required|string',
        'website' => 'required|url'
    ];

    $messages = [
        'first_name.required' => 'El nombre es obligatorio.',
        'first_name.string' => 'El nombre debe ser una cadena de texto.',
        'first_name.max' => 'El nombre no debe exceder los 255 caracteres.',
        'last_name.required' => 'El apellido es obligatorio.',
        'last_name.string' => 'El apellido debe ser una cadena de texto.',
        'last_name.max' => 'El apellido no debe exceder los 255 caracteres.',
        'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
        'birthdate.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        'nationality.required' => 'La nacionalidad es obligatoria.',
        'nationality.string' => 'La nacionalidad debe ser una cadena de texto.',
        'nationality.max' => 'La nacionalidad no debe exceder los 255 caracteres.',
        'biography.required' => 'La biografía es obligatoria.',
        'biography.string' => 'La biografía debe ser una cadena de texto.',
        'website.required' => 'El sitio web es obligatorio.',
        'website.url' => 'El sitio web debe ser una URL válida.'
    ];

    $this->validate($request, $rules, $messages);

    $this->authorService->updateAuthor($id, $request->all());
    return $this->successResponse('Se ha actualizado el autor :)');
}


    public function destroy($id)
    {
        $this->authorService->deleteAuthor($id);
        return $this->successResponse('Se ha eliminado el autor :)');
    }
}
