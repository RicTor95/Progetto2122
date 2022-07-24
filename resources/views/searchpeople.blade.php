<html>
    <head>
	    <script> 
		const BASE_URL = "{{ url('/') }}/";
		const csrf_token = "{{ csrf_token() }}";
		</script>
		<title>SharePoint: Ricerca Utenti</title>
        <link rel='stylesheet' href='{{ url ("css/search_people.css") }}'>
		<script src=' {{ url("js/search_people.js")}}' defer></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
		<meta name="viewport"content="width=device-width, initial-scale=1">
    </head>
    <body>
		<header>  
				<h1 id='nome_social'> SharePoint </h1>
				<h1 id='title'>Ricerca utenti</h1>
		</header>
		<nav class="nav">
			<ul>
				<li class="icon">
					<a href="{{ url('home') }}">
						<i class="fas fa-home"></i>
						<div class="tooltip"> HOME
						</div>  
					</a>     
				</li>
				<li class="icon">
					<a href="{{ url('create_post') }}">
						<i class="fas fa-user-edit"></i>
							<div class="tooltip"> POST
							</div> 
					</a>
				</li>
				<li class="icon">
					<a href="{{ url('search_people') }}">
					<i class="fas fa-search"></i>
							<div class="tooltip"> CERCA
							</div> 
					</a>
				</li>
				<li class="icon">
					<a href="{{ url('logout') }}">
					<i class="fas fa-sign-out-alt"></i>
							<div class="tooltip"> ESCI
							</div> 
					</a>
				</li>			
			</ul>
		</nav>	
			<div id='top'>
				
				<button> Tutti gli utenti</button> 
			</div>
			<main>
				<form id='ricerca' name='ricerca' method='post'>
						<p>
							<label id=search><input type='text' placeholder="Inserisci un nome" name='search'></label>
						</p>
						<p>					
							 <label id='submit'>&nbsp;<input type='submit' value='Cerca'></label>
						</p>
				</form>
				
				<result></result>
				<section id='modal-view' class='hidden'> </section>				
			</main>
		
			<footer>
         <p>Author: Torrisi Riccardo 046001629</p>
        </footer>
    </body>

</html>