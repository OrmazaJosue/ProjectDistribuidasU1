<?php

namespace App\Http\Controllers;

use App\Http\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookController extends Controller
{
    private BookService $bookService;
    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function options()
    {
    }

    public function index()
    {
        return $this->successResponse($this->bookService->getAll());
    }

    public function show($isbn)
    {
        return $this->successResponse($this->bookService->getOne($isbn));
    }

    public function store(Request $request)
    {
        $rules = [
            'isbn' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer',
            'publisher' => 'required|string|max:255',
            'year' => 'required|integer|digits:4',
            'price' => 'required|numeric|min:0',
            'pages' => 'required|integer|min:1'
        ];

        $messages = [
            'isbn.required' => 'El ISBN es obligatorio.',
            'isbn.string' => 'El ISBN debe ser una cadena de texto.',
            'isbn.max' => 'El ISBN no debe exceder los 255 caracteres.',
            'title.required' => 'El título es obligatorio.',
            'title.string' => 'El título debe ser una cadena de texto.',
            'title.max' => 'El título no debe exceder los 255 caracteres.',
            'author_id.required' => 'El ID del autor es obligatorio.',
            'author_id.integer' => 'El ID del autor debe ser un número entero.',
            'publisher.required' => 'El editorial es obligatorio.',
            'publisher.string' => 'El editorial debe ser una cadena de texto.',
            'publisher.max' => 'El editorial no debe exceder los 255 caracteres.',
            'year.required' => 'El año es obligatorio.',
            'year.integer' => 'El año debe ser un número entero.',
            'year.digits' => 'El año debe tener 4 dígitos.',
            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio debe ser al menos 0.',
            'pages.required' => 'El número de páginas es obligatorio.',
            'pages.integer' => 'El número de páginas debe ser un número entero.',
            'pages.min' => 'El número de páginas debe ser al menos 1.'
        ];

        $this->validate($request, $rules, $messages);
        $this->bookService->createBook($request->all());
        return $this->successResponse('Se ha creado un nuevo libro :)');
    }

    public function update(Request $request, $isbn)
    {
        $rules = [
            'isbn' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer',
            'publisher' => 'required|string|max:255',
            'year' => 'required|integer|digits:4',
            'price' => 'required|numeric|min:0',
            'pages' => 'required|integer|min:1'
        ];

        $messages = [
            'isbn.required' => 'El ISBN es obligatorio.',
            'isbn.string' => 'El ISBN debe ser una cadena de texto.',
            'isbn.max' => 'El ISBN no debe exceder los 255 caracteres.',
            'title.required' => 'El título es obligatorio.',
            'title.string' => 'El título debe ser una cadena de texto.',
            'title.max' => 'El título no debe exceder los 255 caracteres.',
            'author_id.required' => 'El ID del autor es obligatorio.',
            'author_id.integer' => 'El ID del autor debe ser un número entero.',
            'publisher.required' => 'El editorial es obligatorio.',
            'publisher.string' => 'El editorial debe ser una cadena de texto.',
            'publisher.max' => 'El editorial no debe exceder los 255 caracteres.',
            'year.required' => 'El año es obligatorio.',
            'year.integer' => 'El año debe ser un número entero.',
            'year.digits' => 'El año debe tener 4 dígitos.',
            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio debe ser al menos 0.',
            'pages.required' => 'El número de páginas es obligatorio.',
            'pages.integer' => 'El número de páginas debe ser un número entero.',
            'pages.min' => 'El número de páginas debe ser al menos 1.'
        ];

        $this->validate($request, $rules, $messages);
        $this->bookService->updateBook($isbn, $request->all());
        return $this->successResponse('Se ha actualizado el libro :)');
    }


    public function destroy(Request $request, $isbn)
    {
        $this->bookService->deleteBook($isbn);
        return $this->successResponse('Se ha eliminado el libro :)');
    }
}
