<?php

namespace App\Http\Controllers;

use App\Http\Services\LoanService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoanController extends Controller
{
    private LoanService $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function options()
    {
    }

    public function index()
    {
        return $this->successResponse($this->loanService->getAllLoan());
    }

    public function show($id)
    {
        return $this->successResponse($this->loanService->getOneLoan($id));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer',
            'user_id' => 'required|integer',
            'book_isbn' => 'required|string',
            'loan_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:loan_date',
            'status' => 'required|string',
            'notes' => 'nullable|string|max:1000'
        ], [
            'id.required' => 'El ID es obligatorio.',
            'id.integer' => 'El ID debe ser un número entero.',
            'user_id.required' => 'El ID de usuario es obligatorio.',
            'user_id.integer' => 'El ID de usuario debe ser un número entero.',
            'book_isbn.required' => 'El ISBN del libro es obligatorio.',
            'book_isbn.string' => 'El ISBN del libro debe ser una cadena de texto.',
            'loan_date.required' => 'La fecha de préstamo es obligatoria.',
            'loan_date.date' => 'La fecha de préstamo debe ser una fecha válida.',
            'return_date.date' => 'La fecha de devolución debe ser una fecha válida.',
            'return_date.after_or_equal' => 'La fecha de devolución debe ser igual o posterior a la fecha de préstamo.',
            'status.required' => 'El estado es obligatorio.',
            'status.string' => 'El estado debe ser una cadena de texto.',
            'notes.string' => 'Las notas deben ser una cadena de texto.',
            'notes.max' => 'Las notas no deben exceder los 1000 caracteres.',
        ]);

        $this->loanService->createLoan($request->all());
        return $this->successResponse('Se ha creado un nuevo préstamo :)');
    }


    public function update(Request $request, $id)
    {
        $rules = [
            'user_id' => 'required|integer',
            'book_isbn' => 'required|string',
            'loan_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:loan_date',
            'status' => 'required|string',
            'notes' => 'nullable|string|max:1000'
        ];

        $messages = [
            'user_id.required' => 'El ID de usuario es obligatorio.',
            'user_id.integer' => 'El ID de usuario debe ser un número entero.',
            'book_isbn.required' => 'El ISBN del libro es obligatorio.',
            'book_isbn.string' => 'El ISBN del libro debe ser una cadena de texto.',
            'loan_date.required' => 'La fecha de préstamo es obligatoria.',
            'loan_date.date' => 'La fecha de préstamo debe ser una fecha válida.',
            'return_date.date' => 'La fecha de devolución debe ser una fecha válida.',
            'return_date.after_or_equal' => 'La fecha de devolución debe ser igual o posterior a la fecha de préstamo.',
            'status.required' => 'El estado es obligatorio.',
            'status.string' => 'El estado debe ser una cadena de texto.',
            'notes.string' => 'Las notas deben ser una cadena de texto.',
            'notes.max' => 'Las notas no deben exceder los 1000 caracteres.',
        ];

        $this->validate($request, $rules, $messages);

        $this->loanService->updateLoan($id, $request->all());
        return $this->successResponse('Se ha actualizado el préstamo :)');
    }


    public function destroy(Request $request, $id)
    {
        $this->loanService->deleteLoan($id);
        return $this->successResponse('Se ha eliminado el préstamo :)');
    }
}
