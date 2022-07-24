<?php

namespace App\Http\Controllers;



use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use App\Models\Post;
use Carbon\Carbon;
 


class Create_postController extends BaseController
{

   public function do_search_YouTube($campo){
    
	$curl=curl_init();
	$key= 'AIzaSyAvEi2qkAzUm4ncmtjN3JC2V8_IeZ08SsM';
	$api_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' .$campo . '&maxResults=15&key=' . $key;
	curl_setopt($curl, CURLOPT_URL, $api_url);//imposto url
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_VERBOSE, 0);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//restituisco il risultato come stringa
	$result=curl_exec($curl);
	curl_close($curl);
    return $result;
}

public function do_search_Giphy($dati){
    $curl=curl_init();
	curl_setopt($curl, CURLOPT_URL, "https://api.giphy.com/v1/gifs/search?q=".$dati."&limit=20&api_key=f14oA4D635caZJbc7yDZHmNe6Baxh6dK");
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result=curl_exec($curl);
	curl_close($curl);
    return $result;
} 

public function do_search_Open_Library($autore){
    $url = "http://openlibrary.org/search.json?author=" .$autore ."&limit=15";
    $ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch , CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($ch);
	curl_close($ch);	
	return $result;   
}

public function posting(){
   $m=array();
   $request = request();
   $titolo = $request->titolo;
   $url = $request->url;
   $commento = $request->commento;
   $autore = $request->autore;
   $type = $request->type;
   $user = Session::get('username');
   $lastPost = Post::select('id')->orderBy('id','desc')->first();
   $id =  $lastPost->id+1;
   //$query= DB::insert("Insert into post values( '$id' , '$user', '$titolo', '$url', '$commento', '$autore', '$type', CURDATE())");
   $post = new post;
   $post ->id = $id;
   $post->username = $user;
   $post->titolo = $titolo;
   $post->url = $url;
   $post->commento = $commento;
   $post->altro = $autore;
   $post->type = $type;
   $post->data = Carbon::now();
   $post->save();
   if($post){
		$m[0]=1;		//Il codice 1 indica che il post è stato pubblicato
		return $m;
	}
	else{
		$m[0]=0;		//Il codice 1 indica che il post non è stato pubblicato
		return $m;
	}
}









    
}