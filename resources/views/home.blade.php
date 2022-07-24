<html>
    <head>
		<script> 
		const BASE_URL = "{{ url('/') }}/";
		const csrf_token = "{{ csrf_token() }}";
		</script>
		<title>SharePoint</title>
        <link rel='stylesheet' href='{{ url ("css/home.css") }}'>
		<script src=' {{ url("js/home.js")}}' defer></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
		<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
		<meta name="viewport"content="width=device-width, initial-scale=1">
    </head>
    <body>
		<header>  
				<h1 id='nome_social'> SharePoint </h1>
				<h1 id='title'>Home</h1>	
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

		<main>
			<result id='view'></result>
			<section id='modal-view' class='hidden'> </section>
		</main>  
		<footer>
         <p>Author: Torrisi Riccardo 046001629</p>
        </footer>   		
    </body>
</html>