<?php

namespace App\Traits;

use GuzzleHttp\Client;

trait ConsumesExternalService
{
    // Hace una peticion HTTP a un servicio externo
    public function performRequest($baseUri, $method, $requestUrl, $formParams = [], $headers = [])
    {
        $client = new Client([
            'base_uri' => $baseUri,
        ]);

        $response = $client->request($method, $requestUrl, ['form_params' => $formParams, 'headers' => $headers]);

        return $response->getBody()->getContents();
    }
}
