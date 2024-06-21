<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->options('/users', 'UserController@options');
$router->options('/users/{id}', 'UserController@options');

$router->get('/users', 'UserController@index');
$router->post('/users', 'UserController@store');
$router->get('/users/{id}', 'UserController@show');
$router->put('/users/{id}', 'UserController@update');
$router->delete('/users/{id}', 'UserController@destroy');

$router->options('/loans', 'LoanController@options');
$router->options('/loans/{id}', 'LoanController@options');

$router->get('/loans', 'LoanController@index');
$router->post('/loans', 'LoanController@store');
$router->get('/loans/{id}', 'LoanController@show');
$router->put('/loans/{id}', 'LoanController@update');
$router->delete('/loans/{id}', 'LoanController@destroy');
