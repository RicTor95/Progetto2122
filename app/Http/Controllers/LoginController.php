<?php

namespace App\Http\Controllers;



use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Storage;
use Illuminate\Support\Facades\Request;

class LoginController extends BaseController
{
   
    
 public function login_form()
 {
//se l'utente ha già fatto il login, non c'è motivo di mostrare il form e quindi lo riportiamo alla home. 
     if (Session::get('username'))
     {
         return redirect('home');
     } 
     
     $error = Session::get('error');
     Session::forget('error');
     return view('login')->with('error', $error);
 }


 public function do_login()
 {
 
    if(Session::get('username')) 
    {
      return redirect('home'); 
    }

    if(strlen(request('username'))== 0 || strlen(request('password'))==0 )
    {
        Session::put('error', 'vuoto');
        return redirect('login')->withInput();
    }
    
    $user = User::where('username', request('username'))->first();
    if(!$user  || request('password')!= $user->password)
    {
      
        Session::put('error', 'wrong');
        return redirect('login')->withInput();
    }
    
    Session::put('username', $user->username);
     return redirect('home');
   
}



public function register_form()
{
//se l'utente ha già fatto il login, non c'è motivo di mostrare il form e quindi lo riportiamo alla home. 
        if (Session::get('username')){
            return redirect('home');
        } 
        $error = Session::get('error');
        Session::forget(('error'));
        return view('register')->with('error', $error);
}



 public function do_register()
    {
        if(strlen(request('username'))==0 || strlen(request('password')==0)) {
            Session::put('error', 'empty_fields');
            return redirect('register');
            
        }
         if (Session::get('username')){
            return redirect('home');
        } 
    
     /*
        $request = request();
        $newuser = User::create([
        'nome' => $request['nome'],
        'cognome' => $request['cognome'],
        'email' => $request['email'],
        'username'=> $request['username'],// impostiamo gli attributi 
        'password' => $request['password'],
        'sesso' => $request['sesso'],
        'data' => $request['data'],
        'image' => $request['image'],
        
    ]);
    if($newuser){
        
       //Redirect alla home
       return redirect('home');

    }else{
        return redirect('register');
    }*/
       $request = request();
       $user = new User;//creiamo una istanza user
       $user -> nome = request('nome');
       $user -> cognome = request('cognome');
       $user -> email = request('email');
       $user -> username = request('username');// impostiamo gli attributi 
       $user -> password = request('password');
       $user -> sesso = request('sesso');
       $user -> data = request('data');
       if($request->hasfile('img'))
        {
            $file = $request->file('img');
            $extenstion = $file->getClientOriginalExtension();
            $filename = time().'.'.$extenstion;
            $folder = 'img/';
            $file->move('img/', $filename);
            $user->image = $folder.$filename;
        }else{
            $noprofilo = 'img/noprofilo.png';
            $user->image =$noprofilo;
        }
    
       $user->save();
       
       //Login, se una sessione è stata avviato se esiste una variabile di session user-id che contiene userid dell'utente che è stato riempito da save  
       Session::put('username', $user->username);
      
       //Redirect alla home
       return redirect('home');
 }
 //Funzione per la route per fare il logout
 public function logout()
 {
    //elimina dati di sessione
    Session::flush();
    return redirect('login'); 
 }

 public function check_username($username)
 {
    //$query=DB::select("SELECT username FROM utenti WHERE username = '$username'");	
    $row = User::where('username' , $username)->count();
    // Verifica la correttezza delle credenziali
    $m=array();
   if($row==1){
    
       $m[0]=0;		   
       return$m;
    }
    else{
        $m[0]=1;
        return$m;
    }

 }


}
