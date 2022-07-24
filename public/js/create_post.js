//Questa funzione in base al valore della select chiama la funzione opportuna
function cerca(event){
	event.preventDefault()		//Impedisci il submit del form
	console.log("Sono nella cerca")
	
	const API_input = document.querySelector('#API');
	const API_value = API_input.value;
	console.log(API_value)
	
	switch(API_value){
		case "OpenLibrary": 
			OpenLibrary(); 
			break;
		case "Giphy":
			Giphy();
			break; 
		case "YouTube":
			YouTube();
			break;
	}	
}

//Queste due funzioni richiedono leggono e stampano i risultati da YouTube
function YouTube(){
	let input = document.querySelector('#content');
	let val = input.value;
	console.log('Eseguo ricerca: ' + val)
	console.log('URL: '+BASE_URL + 'do_search_YouTube/' +val)
	//Esegui fetch
	fetch(BASE_URL + 'do_search_YouTube/'+val).then(onResponse).then(onJsonYouTube);
}

function onJsonYouTube(json){
	console.log("Sono nella onJsonYouTube")
	console.log(json)

	let num_results=json.items.length;
	
	const type='YouTube';
	const result=document.querySelector('#view');
	//result.classList.remove('wrap_class');
	result.innerHTML='';

	if(num_results==0){
		let errore=document.createElement('p');
		errore.textContent= "Nessun contenuto trovato";
		errore.innerHTML=errore.innerHTML+'<i class="fas fa-sad-tear"></i>';
		errore.classList.add("noContent");
		
		result.appendChild(errore);
	}
	else{
		let tasti=[];
		for(let i=0; i<num_results; i++){
			let vettore=json.items[i];
			if(vettore.id.kind!=="youtube#channel"){//kind:Identifica il tipo di risorsa API. Il valore sarà youtube#channelListResponse

				let videoId=vettore.id.videoId;
				let titolo=vettore.snippet.title;
				let canale=vettore.snippet.channelTitle;
				let url="//www.youtube.com/embed/"+videoId+"?autoplay=1";

				const box=document.createElement('div');
				box.classList.add("youTubeContent")

				const videoTitle=document.createElement('div');
				videoTitle.classList.add('videoTitle')
				videoTitle.textContent=titolo;

				const videoChannel=document.createElement('div');
				videoChannel.classList.add('videoChannel')
				videoChannel.textContent="Video di :" +canale;

				const text=document.createElement('div');
				text.classList.add("youTubeText");

				const button=document.createElement('button');			
				button.classList.add('pubblica');
				button.textContent='Pubblica';
				button.id="Button"+i;

				let iframe=document.createElement('iframe')
				iframe.src = url;
				iframe.setAttribute('allowFullScreen', '');
				iframe.classList.add('videoDiv');
				box.appendChild(iframe);
				box.appendChild(text);
				text.appendChild(videoTitle);
				text.appendChild(videoChannel);
				box.appendChild(button);
				result.appendChild(box);
				
				tasti[i]=document.querySelector('#Button'+i);
				
				console.log('I dati sono ' + url)
				tasti[i].addEventListener('click', function(event){modal(event, titolo, canale , url, type)});
			}
		}
	}
}

//Queste due funzioni richiedono leggono e stampano i risultati da Giphy
function Giphy(){
	let input = document.querySelector('#content');
	let val = input.value;
	console.log('Eseguo ricerca: ' + val)
	rest_url = 'http://localhost/HW1/do_search_Giphy.php?campo=' + val;
	console.log('URL: ' + BASE_URL+ 'do_search_Giphy/'+ val)
	
	//Esegui fetch
	fetch(BASE_URL+ 'do_search_Giphy/'+ val).then(onResponse).then(onJsonGiphy);
}

function onJsonGiphy(json){
	console.log("Sono nella onJsonGiphy")
	console.log(json);

	const library = document.querySelector('#view');
	library.innerHTML = '';
	let num_results = json.data.length;
	console.log("Trovati "+num_results+" risultati")
	if(num_results==0){
		let errore=document.createElement('p');
		errore.textContent= "Nessun contenuto trovato";
		errore.innerHTML=errore.innerHTML+'<i class="fas fa-sad-tear"></i>';
		errore.classList.add("noContent");
		
		library.appendChild(errore);
	}
	else{
		let tasti=[];
		for(let i=0; i<num_results; i++){
			const doc= json.data[i];
			const id=doc.id;
			const url = "https://media.giphy.com/media/" + id+ "/giphy.gif";
			
			const book= document.createElement('div');
			const img=document.createElement('img');
			const button=document.createElement('button');		
			
			const type='Giphy';
			
			img.src=url;
			button.textContent="Pubblica";
			button.id="Button"+i;
			
			book.classList.add('blocco_risultatowr');
			button.classList.add('pubblica');
			img.classList.add('img_gif');
			
			library.classList.add('wrap_class');
			
			
			book.appendChild(img);
			book.appendChild(button);
			library.appendChild(book);
			
			tasti[i]=document.querySelector('#Button'+i);
			
			console.log('I dati sono ' + url)
			tasti[i].addEventListener('click', function(event){modal(event, "GIF", "", url, type)});			
		}
	}

}

//Queste due funzioni richiedono leggono e stampano i risultati da OpenLibrary
function OpenLibrary(){
	console.log("Sono nella fetch")
	
	let author_input = document.querySelector('#content');
	let author_value = author_input.value;
	
	console.log('Eseguo ricerca: ' + author_value)
	rest_url = 'http://localhost/HW1/do_search_OpenLibrary.php?campo=' + author_value;
	console.log('URL: ' + rest_url)
	
	//Esegui fetch
	fetch(BASE_URL +'do_search_Open_Library/'+author_value).then(onResponse).then(onJsonOpenLibrary);	
}

function onJsonOpenLibrary(json){
	console.log('JSON ricevuto');
	console.log(json)	
		
	const library = document.querySelector('#view');
	library.classList.remove('wrap_class');
	library.innerHTML = '';
	let num_results = json.num_found;
	
	if(num_results==0){
		let errore=document.createElement('p');
		errore.textContent= "Nessun contenuto trovato";
		errore.innerHTML=errore.innerHTML+'<i class="fas fa-sad-tear"></i>';
		errore.classList.add("noContent");
		
		library.appendChild(errore);
	}
	else{
		if(num_results>10) num_results=10;
		//Processa ciascun risultato
		let tasti=[];
		for(let i=0; i<num_results; i++){
			const doc= json.docs[i];
			const title=doc.title;
			const isbn=doc.isbn[0];
			const cover_url = 'http://covers.openlibrary.org/b/isbn/'+isbn + '-M.jpg';
			const first_publish=doc.first_publish_year;
			const author=doc.author_name;
			
			const book= document.createElement('div');
			const caption=document.createElement('span');
			const img=document.createElement('img');
			const button=document.createElement('button');
			const titolo=document.createElement('p');
			const first_p=document.createElement('p');
			const autore=document.createElement('p');			
			
			const type='OpenLibrary';
			
			img.src=cover_url;
			button.textContent="Pubblica";
			
			titolo.textContent = title;
			first_p.textContent= first_publish;
			autore.textContent=author;
			
			caption.setAttribute("name", "testo");
			titolo.setAttribute("name", "titolo");
			autore.setAttribute("name", "autore");
			first_p.setAttribute("name", "first_p");
			
			book.classList.add('blocco_risultato');
			button.classList.add('pubblica');
			button.id=('Button'+i)
			caption.classList.add('center');
			library.classList.add('view');

			caption.appendChild(titolo);
			caption.appendChild(autore);
			caption.appendChild(first_p);
			book.appendChild(img);
			book.appendChild(caption);
			book.appendChild(button);
			library.appendChild(book);
			
			tasti[i]=document.querySelector('#Button'+i);
			
			console.log('I dati sono '+title+author+cover_url)
			tasti[i].addEventListener('click', function(event){modal(event, title, author, cover_url, type)});			
		}
	}
}

//Classica funzione onResponse
function onResponse(response) {
    console.log("Siamo nella onResponse")
	console.log(response)
	
	return response.json();
}

//Funzione che si occupa di passare i dati alla modale e di crearla
function modal(event, titolo, altro, url, type){
	console.log("Sono entrato nella funzione 'Modal'")
	
	const text = document.createElement('p');
	text.textContent= 'Inserisci un commento da pubblicare insieme al post: ';
	
	const t = document. createElement('input');
	t.type='hidden';
	t.name='titolo';
	t.value=titolo;
	console.log(t.value)
	
	const u = document.createElement('input');
	u.type='hidden';
	u.name='url';
	u.value=url;
	console.log(u.value)
	
	const wr = document.createElement('textarea');
	wr.type='text';
	wr.name='commento';
	wr.cols=30;
	wr.rows=7;
	
	const a = document.createElement('input');
	a.type='hidden';
	a.name='autore';
	a.value=altro;
	console.log(a.value)
	
	const tp = document.createElement('input');
	tp.type='hidden';
	tp.name='type';
	tp.value=type;
	console.log(tp.value)
	
	const button = document.createElement('button');
	button.textContent="Chiudi";
	
	const lab = document. createElement('div');
	
	const sub = document.createElement('input');
	sub.type='submit';
	sub.textContent='Pubblica';
	
	const form_p = document.createElement('form');
	form_p.classList.add('form_modale');

	modalView.appendChild(form_p);
	form_p.appendChild(text);
	form_p.appendChild(wr);
	form_p.appendChild(t);
	form_p.appendChild(u);
	form_p.appendChild(a);
	form_p.appendChild(tp);
	form_p.appendChild(lab);
	lab.appendChild(button);
	lab.appendChild(sub);
	modalView.classList.remove('hidden');
	
	button.addEventListener('click', onModalClick);
	form_p.addEventListener('submit', pubblica);
}

//Funzione che si occupa di chiudere la modale
function onModalClick(){
	modalView.classList.add('hidden');
	modalView.innerHTML='';
	event.preventDefault()	
}

//Funzione che si occupa di mandare alla posting.php i dati del post da pubblicare
function pubblica(event){
	console.log("Sono in pubblica")
	event.preventDefault()			//Impedisci il submit del form
	
	const form_p= event.currentTarget;
	const formData = new FormData(form_p);
	//const form_data = {method: 'post', body: new FormData(form_p)};
	formData.append('_token', csrf_token)
	const url = 'http://localhost/HW1/posting.php';
	
	
	fetch(BASE_URL+'posting',{ method: 'POST', body: formData }).then(onResponse).then(onJsonPub);
}

function onJsonPub(json){
	const disclamer= document.createElement('div');
	disclamer.classList.add('disclamer');

    if (json[0] == 0){
		disclamer.textContent="Post non pubblicato! Riprova...";
		modalView.innerHTML='';
		modalView.appendChild(disclamer);
		disclamer.addEventListener('click', onModalClick);
		modalView.classList.remove('hidden')
	}
	else {
        disclamer.textContent = "Post pubblicato con successo!";
		modalView.innerHTML='';
		modalView.appendChild(disclamer);
		modalView.classList.remove('hidden')
		setTimeout( function() {
		  window.location.href = BASE_URL+'home';	//Alla fine della pubblicazione dopo 3 secondi si viene reinderizzati alla home
		}, 1000);
    }
}	

const modalView=document.querySelector('#modal-view');
const form = document.forms['choice'];
form.addEventListener('submit', cerca);