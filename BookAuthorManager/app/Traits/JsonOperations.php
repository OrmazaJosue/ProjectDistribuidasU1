<?php

namespace App\Traits;

trait JsonOperations
{
    public function readFile() {
        return json_decode(file_get_contents($this->filePath));
    }

    public function saveFile($data) {
        file_put_contents($this->filePath, json_encode($data));
    }
}
