<?php

namespace App\Models;
 
 
use Illuminate\Database\Eloquent\Model;

class like extends Model{
  
protected $table = 'likes';
protected $autoIncrement = false;
protected $fillable = ['id_post', 'username',];
public $timestamps = false;
public function user(){
  
  return $this -> belongsTo('App/Models/User');//Relazione N N si usa belogsToMany 
} 
 
 
  public function post(){
  
    return $this -> hasMany('App/Models/post');//Relazione N N si usa belogsToMany 
  } 
   
}
?>