<?php

namespace App\Models;
 
 
use Illuminate\Database\Eloquent\Model;

class follow extends Model{

protected $table = 'follow';
protected $autoIncrement = false;
protected $fillable = ['follower', 'seguito',];
public $timestamps = false;

 public function user(){
  
  return $this -> belongsToMany('App/Models/User');
} 
 
 
 
   
}
?>