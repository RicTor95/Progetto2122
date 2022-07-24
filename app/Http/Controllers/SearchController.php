<?php

namespace App\Http\Controllers;

 

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Post;
use App\Models\like;
use App\Models\follow;
use Illuminate\Support\Facades\Session;

class SearchController extends BaseController
{
 
   public function search_people($nome)
   {
        $m=array();
		$row1=array();
		$row2=array();
        $user = Session::get('username');
        //$query1 = DB::select("SELECT * FROM utenti WHERE nome = '$nome' AND username <>'$user'");
       // $query1 = DB::table("utenti")->where("nome",$nome) ->where( "username",  "<>", $user)->get();
        $query1 = User::where("nome",$nome) ->where( "username",  "<>", $user)->get();
       //$query2 = DB::table('follow')->where("follower", $user)->get('seguito');
        $query2 = follow::where( "follower" ,$user)->get('seguito');
      	//$query2 = DB::select("SELECT seguito FROM follow WHERE follower = '$user'");
		
        
         if(count($query1)>0){
           
         
			//Inserisci i risultati e inviali tramite json
            $row1 =$query1->ToArray();
            
		 }
         else
		 {	//Il file js per p[0]=0 segnalerà all'utente che non ci sono risultati
			 $m[0]=0;
			 return $m;
		 }
        

		if(count($query2)>0){
             
           //Inserisci i risultati e inviali tramite json 
            $row2 =$query2->ToArray();
		}
		
		$k=0;

		for($i=0; $i<count($row1); $i++, $k++){
			$m[$k]['username'] = $row1[$i]['username'];
			$m[$k]['nome'] = $row1[$i]['nome'];
			$m[$k]['cognome'] = $row1[$i]['cognome'];			
			$m[$k]['email'] = $row1[$i]['email'];
			$m[$k]['data'] = $row1[$i]['data'];
			$m[$k]['image'] = $row1[$i]['image'];
			$m[$k]['followed']=0;

			for($j=0; $j<count($row2); $j++){
				$str1=strtolower($row1[$i]['username']);
				$str2=strtolower($row2[$j]['seguito']);

				if(strcmp($str1, $str2)==0)
					$m[$k]['followed']=1;	//Se si inserisce 1 nel campo followed significa che l'utente già segue questa persona, ne conseguono alcune azioni(Scritta unfollow, handler per unfolloware)
			}
		}
		return $m;    
		
} 

public function search_all()
{
    $m=array();
    $row1=array();
    $row2=array();
    $user = Session::get('username');
    //$query1 = DB::select("SELECT * FROM utenti WHERE username <> '$user' order by nome");
    //$query1 = DB::table("utenti")->where( "username",  "<>", $user)->get();
    $query1 = User::where( "username",  "<>", $user)->get();
    //$query2 = DB::table('follow')->where("follower", $user)->get('seguito');
    //$query2 = DB::select("SELECT seguito FROM follow WHERE follower = '$user'");
    $query2 = follow::where( "follower" , $user)->get('seguito');

    
     if(count($query1)>0){
        $row1 =$query1->ToArray();
        
     }
     else
     {	//Il file js per p[0]=0 segnalerà all'utente che non ci sono risultati
         $m[0]=0;
         return $m;
     }
    

    if(count($query2)>0){
        $row2 =$query2->ToArray();
       
    
    }

    
    $k=0;

    for($i=0; $i<count($row1); $i++, $k++){
        $m[$k]['username'] = $row1[$i]['username'];
        $m[$k]['nome'] = $row1[$i]['nome'];
        $m[$k]['cognome'] = $row1[$i]['cognome'];			
        $m[$k]['email'] = $row1[$i]['email'];
        $m[$k]['data'] = $row1[$i]['data'];
        $m[$k]['image'] = $row1[$i]['image'];
        $m[$k]['followed']= 0;

        for($j=0; $j<count($row2); $j++){
            $str1=strtolower($row1[$i]['username']);
            $str2=strtolower($row2[$j]['seguito']);

            if(strcmp($str1, $str2)==0)
                $m[$k]['followed']=1;	//Se si inserisce 1 nel campo followed significa che l'utente già segue questa persona, ne conseguono alcune azioni(Scritta unfollow, handler per unfolloware)
        }
    }
    return $m;    
    

}
 
public function following($seguito)
{
    $m=array();
    $user = Session::get('username');	
	$follower=strtolower($user);
    $segui=strtolower($seguito);
		
			if($follower==$segui){
				$m[0]=0;		//Il codice 3 indica che non puoi seguire te stesso
				return $m;
			}
			else{			
				//$query=DB::insert( "INSERT into follow values( '$user', '$seguito')");
                $newFollow= new follow;
                $newFollow->follower = $user;
                $newFollow->seguito = $seguito;
                $newFollow->save();
								
					
					if($newFollow){
				   //indica che è hai iniziato a seguire l'utente
					$m[0]=$seguito;
					return $m;
					}
					else
					{	//Il file js per m[0]=0 segnalerà all'utente che c'è stato un errore
						$m[0]=0;
						return $m;
					}
				}

}

public function unfollowing($seguito)
{
    $m=array();	
    $user = Session::get('username');		
	//query= DB::delete("DELETE from follow where follower='$user' AND seguito='$seguito'");
    $query = follow::where('follower', $user)->where('seguito', $seguito)->delete();
    if($query>0){
    //Il codice 1 indica che è hai unfollowato l'utente
    $m[0]=$seguito;
    return $m;
    }
    else
    {	//Il file js per m[0]=0 segnalerà all'utente che c'è stato un errore
        $m[0]=0;
       return $m;
    }
    
}








}