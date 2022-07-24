<?php

namespace App\Models;
 
 
use Illuminate\Database\Eloquent\Model;

class Post extends Model{

protected $table = 'post';
protected $fillable = ['id', 'username', 'titolo', 'url', 'commento', 'altro','type', 'data'];
public $timestamps = false;
 
  public function user(){
  
    return $this->belongsTo('App/Models/User');
  } 

  public function like(){
    return $this -> belongsToMany('App/Models/like');
  }  
   
}
?>