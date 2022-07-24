//Dato un nome chiama la funzione di ricerca
function ricercaUtenti(event){
	console.log("Sono nella fetch")
	event.preventDefault();
    url = 'http://localhost/HW1/do_search_people.php?nome=' + nome.value;
    console.log("questo è l'url " + BASE_URL + 'search_people/'+ nome.value)

    fetch(BASE_URL + 'search_people/'+ nome.value).then(onResponse).then(onJson);
}

//Ricerca tutti gli utenti presenti nel data base ad eccezione dell'utente connesso
function stampaTutti(event){
	console.log("Sono nella stampaTutti")
	url = 'http://localhost/HW1/do_search_all.php';
    console.log("questo è l'url " + BASE_URL+'search_all')

    fetch(BASE_URL+'search_all').then(onResponse).then(onJson);
}

//Stampa i risultati delle due funzioni sopra
function onJson(json) {
    console.log("Sono nella json, json ricevuto! ");
    console.log(json);	
	
    const mainbox = document.querySelector('result');	//Crei box principale dentro il quale ci andranno i risultati
	mainbox.innerHTML = '';								//Svuota il box(Se prima era pieno)
	
	
    let lunghezza = json.length;	//Vedi quanti elementi devi inserire e prepari il ciclo	
	
	if(json[0]==0){		//Stampa errore in caso non ci siano utenti da mostrare
		let errore=document.createElement('p');
		errore.textContent= "Non esistono utenti con questo nome";
		errore.innerHTML=errore.innerHTML+'<i class="fas fa-sad-tear"></i>';
		errore.classList.add("noUser");
		
		mainbox.appendChild(errore);
	}
	else{
		for (let i = 0; i < lunghezza; i++) {		
			//In ogni ciclo viene inserito un box risultato in cui dentro ci sarà l'utente
			let box = document.createElement('div');
			let lbox=document.createElement('div');
			let rbox=document.createElement('div');			
			let nome= document.createElement('p');
			let email=document.createElement('p');
			let data=document.createElement('p');
			let image= document.createElement('img');
			let button=document.createElement('button');			
			
			image.src=json[i].image;
			
			nome.textContent = json[i].nome + " " + json[i].cognome;
			email.textContent = json[i].email;
			data.textContent = json[i].data;		
			button.value=json[i].username;		//Utile per passare il parametro dell username
			button.id=json[i].username;

			//Aggiungo le classi per il CSS serve per la visualizzazione mobile
			box.classList.add('blocco_risultato');
			lbox.classList.add('lbox');
			nome.classList.add('nome');											
			button.classList.add('segui');
			image.classList.add('img_risultato');
			
			//Appendo i box
			mainbox.appendChild(box);			
			box.appendChild(lbox);
			box.appendChild(rbox);			
			lbox.appendChild(image);
			lbox.appendChild(nome);
			lbox.appendChild(data);
			lbox.appendChild(email);
			rbox.appendChild(button);

			image.addEventListener('click', modalPhoto);

			//In base al campo followed vedo se l'utente già lo seguo oppure no
			if(json[i].followed==1){					
				button.textContent= "Unfollow";	
				button.addEventListener('click', unfollow);
				button.innerHTML=button.innerHTML+'<i class="fas fa-user-minus"></i>';
			}
			else{				
				button.textContent= "Follow";	
				button.addEventListener('click', segui);
				button.innerHTML=button.innerHTML+'<i class="fas fa-user-plus"></i>';
			}
		}
		
		//Attivo la funzione segui per i tasti creati
	}
}

//Classica funzione onResponse
function onResponse(response) {
    console.log("Siamo nella onResponse")
    return response.json();
}

//Permette l'apertura delle foto in modalita modale
function modalPhoto(event){
	console.log("Function: modalPhoto")
	const src_image=event.currentTarget.src;
	console.log(src_image)
	const image= document.createElement('img');
	image.src=src_image;
	image.classList.add('modalImage');

	modalView.appendChild(image);
	modalView.classList.remove('hidden');
}

//Al click sul bottone la modale si chiude e cancella il suo contenuto
function onModalClick(){
	modalView.classList.add('hidden');
	modalView.innerHTML='';
}

//Serve per seguire un utente
function segui(event){	
	const bottone=event.target;
	
	url = 'http://localhost/HW1/following.php?seguito=' +bottone.value;
	
    console.log("questo è l'url " + BASE_URL + 'following/'+bottone.value)
	
	fetch(BASE_URL + 'following/'+bottone.value).then(onResponse).then(onFollow);
}

function onFollow(json) {
    console.log("Sono nella json, json ricevuto! ");
    console.log(json);
    if(json[0]==0)
			alert("Qualcosa è andato storto");
	else{
			const button=document.getElementById(json[0]);
			button.textContent= "Unfollow";	
			button.innerHTML=button.innerHTML+'<i class="fas fa-user-minus"></i>';
			button.addEventListener('click', unfollow);			
			button.removeEventListener('click', segui);
	}
}

//Serve per smettere di seguire un utente
function unfollow(event){
	const bottone=event.target;
	
	url = 'http://localhost/HW1/unfollowing.php?seguito=' +bottone.value;
	
    console.log("questo è l'url " + BASE_URL+'unfollowing/'+bottone.value)
	fetch(BASE_URL+'unfollowing/'+bottone.value).then(onResponse).then(onUnfollow);
}

function onUnfollow(json) {
	console.log("Sono nella json, json ricevuto! ");
	console.log(json);
	
	if(json[0]==0)
			alert("Qualcosa è andato storto");
	else{
		const button=document.getElementById(json[0]);
		button.textContent= "Follow";	
		button.innerHTML=button.innerHTML+'<i class="fas fa-user-plus"></i>';
		button.addEventListener('click', segui);			
		button.removeEventListener('click', unfollow);
	}
}

const form = document.forms['ricerca'];
const nome = form.search;
// Aggiungi listener
form.addEventListener('submit', ricercaUtenti);

const cerca_tutti=document.querySelector('button');
cerca_tutti.addEventListener('click', stampaTutti);

//Definisco la modale per poterla usare in più funzioni
const modalView= document.querySelector('#modal-view');
console.log(modalView)
modalView.addEventListener('click', onModalClick);	

