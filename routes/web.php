<?php

use Illuminate\Support\Facades\Route;

/*
|La root di default che mi carica quando non mettiamo un riferimento particolare e mi riporta la login
|
*/

Route::get('/', function () {
    return redirect('login'); 
});
/* tutte le funzionalità relative alla login la metteremo nel controller LoginController che richiama 
la funzione register_form che dovrà visualizzare il form con la view*/
Route::get('login', 'App\Http\Controllers\LoginController@login_form' ); 
Route::post('login', 'App\Http\Controllers\LoginController@do_login' );
Route::get('register', 'App\Http\Controllers\LoginController@register_form' );
Route::post('register', 'App\Http\Controllers\LoginController@do_register');
Route::get('logout', 'App\Http\Controllers\LoginController@logout');
Route::get('check_username/{username}', 'App\Http\Controllers\LoginController@check_username' ); 
/*La home la mettiamo in un'altro controller che mi controllerà le varie funzioni  */
Route::get('home', 'App\Http\Controllers\HomeController@home'); 
Route::get('logout', 'App\Http\Controllers\HomeController@logout');
Route::get('viewpost', 'App\Http\Controllers\HomeController@viewpost');
Route::get('create_post', 'App\Http\Controllers\HomeController@create_post');
Route::get('search_people', 'App\Http\Controllers\HomeController@search_people');
Route::get('modal_like/{id}', 'App\Http\Controllers\HomeController@modal_like');
Route::get('delete_control/{id}', 'App\Http\Controllers\HomeController@delete_control');
Route::get('control_like/{id}', 'App\Http\Controllers\HomeController@control_like');
Route::get('remove_post/{id}', 'App\Http\Controllers\HomeController@remove_post');
Route::post('like', 'App\Http\Controllers\HomeController@like');
/*Route per il controller che gestisce le funzione del create post*/
Route::get('do_search_YouTube/{campo}', 'App\Http\Controllers\Create_postController@do_search_YouTube');
Route::get('do_search_Giphy/{dati}', 'App\Http\Controllers\Create_postController@do_search_Giphy');
Route::get('do_search_Open_Library/{autore}', 'App\Http\Controllers\Create_postController@do_search_Open_Library');
Route::post('posting', 'App\Http\Controllers\Create_postController@posting');
/*Route per il controller che gestisce le funzione del search*/
Route::get('search_people/{nome}', 'App\Http\Controllers\SearchController@search_people');
Route::get('search_all', 'App\Http\Controllers\SearchController@search_all');
Route::get('following/{seguito}', 'App\Http\Controllers\SearchController@following');
Route::get('unfollowing/{seguito}', 'App\Http\Controllers\SearchController@unfollowing');



