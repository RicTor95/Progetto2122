<html>
    <head>
	<script> 
		const BASE_URL = "{{ url('/') }}/";
		const csrf_token = "{{ csrf_token() }}";
	</script>
		<title>Registrazione SharePoint</title>		
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
		<script src="{{ url('js/signup.js') }}" defer></script>
		<meta name="viewport"content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
		<link rel='stylesheet' href="{{ url('css/signup.css') }}">
    </head>
	
    <body>
	
		<header>  
			<h1>SharePoint</h1>
			
		</header> 
		
		<main>
						
			<form  name='registrazione' enctype="multipart/form-data" method='post'>
				@csrf
				<h1> Registrati su SharePoint! </h1>
				<p id='errore_campi' class='hidden'>Compilare tutti i campi!</p>
                <p>
                    <label>Nome <input type='text' name='nome' maxlength="16"></label>
                </p>
                <p>
                    <label>Cognome <input type='text' name='cognome' maxlength="16"> </label>
                </p>
				<p>
                    <label>Email <input type='text' placeholder="Es: abc@def.com" name='email' maxlength="32"> <i class="fas fa-exclamation-circle" id='email_error'></i></label>
                </p>
				<p>
                    <label>Username<input type='text' placeholder="Max. 16 caratteri" name='username'> <i class="fas fa-exclamation-circle" id='username_error'> </i> </label>
                </p>
				<p>
                    <label>Password <input type='password' name='password' maxlength="16"></label>
                </p>
				<p>
                    <label>Conferma Password <input type='password' name='c_password' maxlength="16"> <i class="fas fa-exclamation-circle" id='passw_error'></i> </label>
                </p>
				<p>
                    <label id='sesso'>Sesso
					  <label>
					  <input type="radio" id="uom" name="sesso" value="uomo">
					  <label for="male">Uomo</label><br>
					  <input type="radio" id="donna" name="sesso" value="donna">
					  <label for="female">Donna</label><br>
					  </label>
					</label>
                </p>
				<p>
                    <label>Data di nascita <input type='date' name='data'></label>
                </p>
				<p>
                    <label id=image>Inserisci immagine &nbsp;<input id=img name="img" type="file" /></label>
                </p>
                <p>					
                    <label><input class='button' type="reset"> &nbsp;<input class='button' type='submit'></label>
                </p> 
            </form>
			
			<div id=login>
				<h1> Sei già registrato? </h1>
				<a id='btn' href="{{ url('login') }}"> Torna al Login! </a>
			</div>
			
		</main>
		<footer>
         <p>Author: Torrisi Riccardo 046001629</p>
        </footer>
		
    </body>
</html>
