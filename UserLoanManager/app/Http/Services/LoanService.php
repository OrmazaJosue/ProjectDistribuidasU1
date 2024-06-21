<?php
namespace App\Http\Services;
use App\Http\Repositories\LoanRepository;
use App\Models\Loan;
use App\Traits\ConsumesExternalService;

class LoanService
{
    use ConsumesExternalService;

    private UserService $userService;
    private LoanRepository $loanRepository;

    public function __construct(LoanRepository $loanRepository, UserService $userService){
        $this->loanRepository = $loanRepository;
        $this->userService = $userService;
    }

    public function getAllLoan(){
        return $this->loanRepository->getAllLoan();
    }

    public function getOneLoan(int $id){
        return $this->loanRepository->getOneLoan($id);
    }

    public function createLoan(array $data){
        $book = json_decode($this->performRequest(config('services.books_authors.base_uri'), "GET", '/books/'.$data['book_isbn']));
        $book = $book->data;

        $user = $this->userService->getOneUser($data['user_id']);
        unset($user->password);

        $loan = new Loan();
        $loan->id = $data['id'];
        $loan->user = $user;
        $loan->book = $book;

        $loan->loan_date = $data['loan_date'];
        $loan->return_date = $data['return_date'] ?? null;
        $loan->status = $data['status'];
        $loan->notes = $data['notes'] ?? null;

        $this->loanRepository->addLoan($loan);
    }

    public function updateLoan(int $id, array $data){
        $book = json_decode($this->performRequest(config('services.books_authors.base_uri'), "GET", '/books/'.$data['book_isbn']));
        $book = $book->data;

        $user = $this->userService->getOneUser($data['user_id']);
        unset($user->password);

        $loan = new Loan();
        $loan->id = $id;
        $loan->user = $user;
        $loan->book = $book;
        $loan->loan_date = $data['loan_date'];
        $loan->return_date = $data['return_date'] ?? null;
        $loan->status = $data['status'];
        $loan->notes = $data['notes'] ?? null;

        $this->loanRepository->updateLoan($id, $loan);
    }
    public function deleteLoan(int $id){
        $this->loanRepository->deleteLoan($id);
    }
}
