<?php

namespace App\Http\Controllers;



use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Post;
use App\Models\like;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class HomeController extends BaseController
{
    public function home(){
        if(!Session::get('username'))
        {
            return redirect('login');
        }
        return view('home');
        
    }
    

 public function logout()
 {
    //elimina dati di sessione
    Session::flush();
    return redirect('login'); 
 }

  
 public function viewPost()
 { 
    $m=array();
    $user = Session::get('username');
    $query1 = DB::select("SELECT DISTINCT ID , altro, nome, cognome, commento, image, type, url, titolo, P.data FROM (post P join follow F on P.username = F.seguito)join utenti U on U.username=P.username where follower = '$user' order by ID DESC");
    $query2 = DB::select("Select  DISTINCT ID , altro, nome, cognome, commento, image, type, url, titolo, P.data from (post P join utenti U on P.username = U.username) where P.username ='$user' order by ID DESC");
    $m = array_merge( $query1, $query2);
    return $m;
}


public function search_people()
 {
   if(!Session::get('username'))
   {
       return redirect('login');
   }
    return view('searchpeople');
 }


 public function create_post()
 {
   if(!Session::get('username'))
   {
       return redirect('login');
   }
    return view('createpost');
 }


 public function delete_control($id)
 {
    $m=array();
    $user = Session::get('username');
    //$query=DB::select("SELECT * from post where id='$id' AND username = '$user'");
    $row = Post::where('username' , $user)->where('id', $id)->count();
    if($row>0){
       $m[0]= $id;
    }else{
      $m[0]= -1;
    }
    return $m;

 }


 public function modal_like($id){
    $m=array();
    if (!Session::get('username')){
        return [];
    } 
    $query1=DB::select("SELECT U.nome, U.cognome, U.image FROM likes L JOIN utenti U on L.username=U.username where L.id_post=  $id");
    if(count($query1)>0){
      return $query1;
    }else{
      $m[0]=0;
	  return $m;

    }
   
 }

public function remove_post($id){
    $m=array();
   if (!Session::get('username')){
      return [];
  } 
   $user = Session::get('username');
   $post = Post::where('username' , $user)->where('id', $id)->delete();
   if($post){
      $m[0]=1;
   }else{
      $m[0]=0;
   }
   return $m;

}

public function like()
{
   $m=array();
   if (!Session::get('username')){
      return [];
  } 
   $request = request();
   $user = Session::get('username');
   $id= $request->id;
   //$query1 = DB::table('likes')-> where ("id_post", $id )->where("username", $user)->count();
   $like = like::where("id_post", $id)->where("username", $user)->count();
   if($like>0){
      //$query3=DB::delete("delete from likes where id_post= '$id' AND username= '$user'");
      $reLike = like::where("id_post", $id)->where("username", $user)->delete();
      if($reLike){
         $m[0] = 2;
			return $m;

      }
      else{
         $m[0]=0;
			return $m;
      }
      
   }
   else{		
      //$query3=DB::insert("Insert into likes values('$id ' , '$user')");
      $AddLike= new like;
      $AddLike->id_post = $id;
      $AddLike->username = $user;
      $AddLike->save();
      if($AddLike){
         $m[0] = 1;
         return $m;
      }
      else{	
         $m[0]=0;
         return $m;
      }
   }
}


 public function control_like($id){
   $m=array();
   if (!Session::get('username')){
      return [];
  } 
   //$query=DB::select("SELECT * FROM likes where id_post=$id AND username='$user'");
   $user = Session::get('username');
   $row = like::where('username' , $user)->where('id_post', $id)->count();
   if($row>0){
      $m[0]= $id; // $row->id;
   }else{
     $m[0]= -1;
   }
   return $m;
}


}
