<?php
namespace App\Http\Repositories;
use App\Traits\JsonOperations;
use App\Models\Loan;

class LoanRepository
{
    use JsonOperations;

    private $filePath;

    public function __construct() {
        $this->filePath = __DIR__.'/../../../public/json/loans.json';
    }

    public function getAllLoan(){
        return $this->readFile();
    }

    public function getOneLoan(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $loa) {
            if ($loa->id == $id) {
                return $data[$i];
            }
        }
        return null;
    }

    public function addLoan(Loan $loan) {
        $data = $this->readFile();
        $data[] = $loan;

        $this->saveFile($data);
    }

    public function updateLoan(int $id, Loan $loan) {
        $data = $this->readFile();
        foreach ($data as $i => $loa) {
            if ($loa->id == $id) {
                $data[$i] = $loan;
            }
        }
        $this->saveFile($data);
    }

    public function deleteLoan(int $id){
        $data = $this->readFile();
        foreach ($data as $i => $loa) {
            if ($loa->id == $id) {
                unset($data[$i]);
            }
        }
        $this->saveFile($data);
    }
}

