<html>
    <head>
		<title>Login: SharePoint</title>
		<link rel='stylesheet' href="{{ url('css/login.css') }}">
		<meta name="viewport"content="width=device-width, initial-scale=1">
    </head>
	
    <body>
               
		
		<header>   
				<h1>SharePoint</h1>
				
		</header> 
               
        <main>		
			<div id=login>
		   
         
            <form name='login' method='post'>
            @csrf
          <p id='spazio_errori'>
                @if($error == 'vuoto')
                <section class='error'>Compilare i campi</section>
                @elseif($error == 'wrong')
                <section class='error'>Credenziali non valide</section>
                @endif
            </p>
                <p id=acc> Login </p>

                <p>
                    <label>Nome utente <input type='text' name='username' value="" ></label>
                </p>
                <p>
                    <label>Password <input type='password' name='password' value=""></label>
                </p>
                <p>
                    <label>&nbsp;<input type='submit'></label>
                </p>
				
            </form>
			</div>
			
			<div id=signup>
				<h1>Non hai un account?</h1>
				<a id='btn' href="{{ url('register ') }}"> Registrati! </a>
			</div>
			
        </main>
        <footer>
         <p>Author: Torrisi Riccardo 046001629</p>
        </footer>
    </body>
</html>