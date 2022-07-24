<?php

namespace App\Models;
 
 
use Illuminate\Database\Eloquent\Model;

class User extends Model{
//Specifico tabella e chiave primaria essendo in contrasto con le convenzioni 
 protected $table = 'utenti';
 protected $primaryKey ="username";
 protected $autoIncrement = false;
 protected $keyType="string";
 //fillable è array che contiene tutti i campi che posso essere riempiti usando assegniazioni di massa
 protected $fillable = ['nome', 'cognome',  'email', 'username', 'password', 'sesso', 'data', 'image',];
 public $timestamps = false;
 
  public function post(){
    return $this->hasMany('App/Models/Post');
  }

  public function like(){
    return $this -> hasMany('App/Models/like');//Relazione N N si usa belogsToMany 
  }  
  public function follow(){
    return $this -> hasMany('App/Models/follow');
  }
   
}
?>