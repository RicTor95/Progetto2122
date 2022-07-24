//Funzione Likes serve ad aggiungere e togliere i Mi piace

function likes(event){
	console.log("Sono nella like");
	console.log(event.currentTarget)
	const formData = new FormData();
	formData.append('id', event.currentTarget.dataset.id);
	//Facendo una richiesta post, dobbiamo appendere anche il token, che viene definito nel blade
	formData.append('_token', csrf_token)
	console.log("questo è l'url " + BASE_URL+'like')
	fetch(BASE_URL+'like',{ method: 'POST', body: formData }).then(onResponse).then(onJsonLike);
}

function onJsonLike(json){
	console.log("Sono nella onJsonLike");
    console.log(json);
	
	//Nel caso di anomalie compare un alert
	if(json[0]!=1 && json[0]!=2)
			alert("Errore nella funziona Like!");
	
	//Richiamo la fillPost() per aggiornare i contenuti
	fillPost();			
}

//La funzione fillPost() si occupa di chiamare la RenderPost per riempire la home

function fillPost(){
	console.log("Function: fillPost")
	console.log("Vado all' url: "+ BASE_URL+'viewpost')
	fetch(BASE_URL+'viewpost').then(onResponse).then(renderPost);
}

//La funzione render post recupera i Json e in base al tipo di post stampa i contenuti

function renderPost(json){
	console.log('Function: RenderPost');
	console.log(json)
	
	const home = document.querySelector('#view');
	home.innerHTML = '';
	let num_results = json.length;

	if(num_results==0){
		alert("Nessun contenuto trovato");
	}
	else{
		if(num_results>20) num_results=20;		//Limitazione per evitare una home troppo affollata

		for(let i=0; i<num_results; i++){
			//Prendiamo i dati del Json che ci interessano
			const titolo=json[i].titolo;
			const id = json[i].ID;
			const url = json[i].url;
			const nome = json[i].nome;
			const cognome = json[i].cognome;
			const image = json[i].image;
			const commento = json[i].commento;
			const altro = json[i].altro;
			const type = json[i].type;
			const data = json[i].data;
			
			
			//Switch che dipende dal Tipo di funzione
			switch(type){
				case 'OpenLibrary':		//Riempimento post di tipo OpenLibrary					

					let book= document.createElement('div');
					let text=document.createElement('div');
					let right= document.createElement('div');
					let img=document.createElement('img');
					let img_pr=document.createElement('img');
					let button=document.createElement('button');
					let title=document.createElement('p');
					let comment=document.createElement('p');
					let other=document.createElement('p');
					let name = document.createElement('p');
					let label = document.createElement('label');
					let like = document.createElement('div');
					let img_l = document.createElement('div');
					let info = document.createElement('span');
					let dataOL = document.createElement('p');
				//Personalizzo il bood.id con l'id del post
					book.id="Book"+id;

					img.src=url;
					img_pr.src=image;
					button.textContent="Like";
					
					title.textContent = titolo;
					comment.textContent= commento;
					other.textContent=altro;		//Contiene l'autore
					name.textContent=nome + " " + cognome;					
					dataOL.textContent=data;

					//Serve per la funzione like
					button.value=id;			
					button.dataset.id= id;
					book.dataset.id = id;
					button.id="B"+id;
					
					img_l.classList.add('l');
					img_l.id="L"+id;
					img_l.innerHTML='<i class="far fa-heart"></i>';
					controllaLike(id);
					
					//Aggiungiamo le classi per poi poter gestire lo stile CSS
					book.classList.add('blocco_risultato');
					button.classList.add('like');
					right.classList.add('parteDx');
					text.classList.add('parteSx');
					name.classList.add('name');
					img.classList.add('c_image');
					img_pr.classList.add('p_image');
					info.classList.add('span_book');
					dataOL.classList.add('data');
								
					//Appendiamo i blocchi
					label.appendChild(img_pr);
					label.appendChild(name);
					info.appendChild(title);
					info.appendChild(other);
					text.appendChild(label);
					text.appendChild(comment);
					text.appendChild(info);
					like.appendChild(button);
					like.appendChild(img_l);
					right.appendChild(img);
					right.appendChild(like);
					book.appendChild(text);
					book.appendChild(right);
					book.appendChild(dataOL);
					home.appendChild(book);

					deleteControl(id);

					//Aggiungiamo i vari listener
					img_l.addEventListener('click', function(event){modalLike(event, id)});			
					button.addEventListener('click', likes);
					console.log(img_pr)
					img_pr.addEventListener('click', modalPhoto);
					img.addEventListener('click', modalPhoto);

					break;

				case 'Giphy':		//Riempimento post tipo Giphy					

					let bookGP= document.createElement('div');
					let topGP=document.createElement('div');
					let botGP= document.createElement('div');
					let imgGP=document.createElement('img');
					let img_prGP=document.createElement('img');
					let buttonGP=document.createElement('button');
					let commentGP=document.createElement('p');
					let nameGP= document.createElement('p');
					let num_likeGP= document.createElement('p');
					let img_lGP = document.createElement('div');
					let underGP= document.createElement('div');
					let textGP=document.createElement('div');
					let rightGP= document.createElement('div');
					let labelGP = document.createElement('label');
					let likeGP = document.createElement('div');
					let dataGP = document.createElement('p');

					
					bookGP.id="Book"+id;

					imgGP.src=url;
					img_prGP.src=image;
					buttonGP.textContent="Like";

					img_lGP.classList.add('l');
					img_lGP.id="L"+id;
					img_lGP.innerHTML='<i class="far fa-heart"></i>';					
					buttonGP.id="B"+id;
					controllaLike(id);
					
					
					commentGP.textContent= commento;
					nameGP.textContent=nome + " " + cognome;										
					dataGP.textContent=data;

					//Serve per la funzione like
					buttonGP.value=id;			
					buttonGP.dataset.id= id;
					bookGP.dataset.id = id;
					
					//Aggiungiamo le classi per poi poter gestire lo stile CSS
					bookGP.classList.add('blocco_risultatoGP');
					buttonGP.classList.add('like');
					topGP.classList.add('topGP');
					botGP.classList.add('botGP')
					nameGP.classList.add('name');
					imgGP.classList.add('GP_image');
					img_prGP.classList.add('p_image');
					dataGP.classList.add('data');

					rightGP.classList.add('parteDx');
					textGP.classList.add('parteSx');

					//Appendiamo i blocchi
					labelGP.appendChild(img_prGP);
					labelGP.appendChild(nameGP);
					textGP.appendChild(labelGP);
					textGP.appendChild(commentGP);
					likeGP.appendChild(buttonGP);
					likeGP.appendChild(num_likeGP);
					likeGP.appendChild(img_lGP);
					rightGP.appendChild(imgGP);
					rightGP.appendChild(likeGP);
					bookGP.appendChild(textGP);
					bookGP.appendChild(rightGP);
					bookGP.appendChild(dataGP);
					home.appendChild(bookGP);

					//Funzione che controlla se l'utente ha il permesso di eliminare il post
					deleteControl(id);	
					
					//Aggiungiamo i vari listener
					img_lGP.addEventListener('click', function(event){modalLike(event, id)});			
					buttonGP.addEventListener('click', likes);
					img_prGP.addEventListener('click', modalPhoto);
					imgGP.addEventListener('click', modalPhoto);

					break;

				case "YouTube":
					
					//Contenitore grande
					let bookYT = document.createElement('div')
					bookYT.classList.add('blocco_risultatoYT');
					bookYT.id="Book"+id;

					//Preparazione label con info utente
					let labelYT=document.createElement('label');
					let img_pYT=document.createElement('img');
					let nomeYT=document.createElement('p');
					img_pYT.src=image;
					nomeYT.textContent=nome+" "+cognome;

					img_pYT.classList.add('p_image');

					labelYT.appendChild(img_pYT);
					labelYT.appendChild(nomeYT);			

					const videoTitle=document.createElement('div');
					videoTitle.classList.add('videoTitle')
					videoTitle.textContent=titolo;

					const videoChannel=document.createElement('p');
					videoChannel.classList.add('videoChannel')
					videoChannel.textContent="Video di :" +altro;

					const commentYT=document.createElement('p');
					commentYT.textContent=commento;

					const bottomYT=document.createElement('div');
					bottomYT.classList.add("youTubeBottom");

					const topYT=document.createElement('div');
					topYT.classList.add('topYT');

					const dataYT=document.createElement('p');
					dataYT.classList.add('data');
					dataYT.textContent=data;
					
					//Sezione Like
					let likeYT = document.createElement('div');
					let num_likeYT= document.createElement('p');
					let img_lYT = document.createElement('div');
					const buttonYT=document.createElement('button');
					buttonYT.textContent='Like';

					buttonYT.classList.add('like');
					likeYT.classList.add('likeYT');
					img_lYT.classList.add('l');

					//Serve per la funzione like
					buttonYT.value=id;			
					buttonYT.dataset.id= id;
					buttonYT.id="B"+id;

					img_lYT.id="L"+id;
					img_lYT.innerHTML='<i class="far fa-heart"></i>';
					controllaLike(id);
					
					likeYT.appendChild(buttonYT);
					likeYT.appendChild(num_likeYT);
					likeYT.appendChild(img_lYT);
					
					//Visualizzatore con iframe un tag html per incorporare elementi esterni da un sito esterno
					
					let iframe=document.createElement('iframe')
					iframe.src = url;
					iframe.setAttribute('allowFullScreen', '');
					iframe.classList.add('videoDiv');					

					//Appendiamo i blocchi
					topYT.appendChild(commentYT);
					topYT.appendChild(videoTitle);
					bookYT.appendChild(labelYT);
					bookYT.appendChild(topYT);
					bookYT.appendChild(iframe);
					bottomYT.appendChild(videoChannel);
					bottomYT.appendChild(likeYT);
					bookYT.appendChild(bottomYT);
					bookYT.appendChild(dataYT);
					home.appendChild(bookYT);	
					
					deleteControl(id);

					//Aggiungiamo i vari listener
					img_lYT.addEventListener('click', function(event){modalLike(event, id)});			
					buttonYT.addEventListener('click', likes);
					img_pYT.addEventListener('click', modalPhoto);				

					break;
			}
		}
	}
}

//Funzione che controlla in quali post deve apparire il cestino (per eliminare il post) e in quali no

function deleteControl(id){
	console.log("Function: deleteControl")
	url = 'http://localhost/HW1/delete_control.php?id='+id;
	console.log("Vado all' url: "+ BASE_URL+ 'delete_control/'+id);
	fetch(BASE_URL +'delete_control/'+ id).then(onResponse).then(onJsonDeleteControl); 
}

function onJsonDeleteControl(json){
	console.log(json)

	if(json[0]>-1){
		const book=document.getElementById('Book'+json[0]);
		console.log(book)
		//Simbolo elimina post
		const trash = document.createElement('p');
		trash.innerHTML='<i class="fas fa-trash-alt"></i>';
		trash.classList.add('trash');
		book.appendChild(trash);
		trash.addEventListener('click', function(event){modalDelete(event, json[0])});
	}
}

//Funzione che permette di cancellare il post tramite modale

function modalDelete(event, id){
	const blocco = document.createElement('div');
	const textDL = document.createElement('p');
	const butDLR = document.createElement('button');
	const butDLD = document.createElement('button');
	const label = document.createElement('span');

	textDL.textContent="Sei sicuro di voler eliminare il post?"
	butDLR.textContent="Annulla";
	butDLD.textContent="Elimina";

	label.appendChild(butDLR);
	label.appendChild(butDLD);
	blocco.appendChild(textDL);
	blocco.appendChild(label);
	modalView.appendChild(blocco);

	modalView.classList.remove('hidden');

	modalView.removeEventListener('click', onModalClick);
	butDLR.addEventListener('click', onModalClick);
	butDLD.addEventListener('click', function(event){ eliminaPost(event, id)});
}

//Funzione che cliccato il pulsante elimina il post

function eliminaPost(event, id){ 
	console.log("Function: eliminaPost")
	const trash = event.currentTarget;

	const url = 'http://localhost/HW1/remove_post.php?id='+id;
	console.log("Vado all' url: "+ BASE_URL+ 'remove_post/'+id);
	fetch(BASE_URL+ 'remove_post/'+ id ).then(onResponse).then(onJsonEliminaPost);

}

function onJsonEliminaPost(json){
	console.log("Function: onJsonEliminaPost")
	console.log(json)

	if(json[0]==1){
		modalView.innerHTML='';
		modalView.classList.add('hidden');
		modalView.addEventListener('click', onModalClick);
		fillPost();
	}
	else{
		alert("Errore nell'eliminazione");
	}
}

//Funzione che serve per cambiare il cuoricino e la scritta
function controllaLike(id){
	console.log("Function: controllaLike")
	console.log("Vado all' url: "+ BASE_URL+ 'control_like/'+id);
	fetch(BASE_URL+ 'control_like/' + id).then(onResponse).then(onJsonControllaLike);
}

function onJsonControllaLike(json){
	console.log("Function: onJsonControllaLike")
	console.log(json)

	if(json[0]>-1){
		console.log("Sono la "+json[0]+" sono entrata nel bottone")
		const button= document.getElementById('B'+json[0]);
		const img= document.getElementById('L'+json[0]);
		console.log(button)
		button.textContent="Remove Like"
		img.innerHTML='<i class="fas fa-heart"></i>';
		
	}
}


//Funzione modal per la visualizzazione dei like
function modalLike(event, id){
	console.log("Sono entrato nella funzione 'Modal")
	console.log("Vado all' url: "+ BASE_URL+ 'modal_like/'+id);
	fetch(BASE_URL+'modal_like/'+ id).then(onResponse).then(onJsonModal);	
}

function onJsonModal(json){
	console.log("Sono nella onJsonModal")
	console.log(json)
	let div = document.createElement('div');
	
	//Nel caso di nessun like spunta il relativo avviso
	if(json[0]==0){
		const noLike = document.createElement('div');
		noLike.classList.add('noLike');
		noLike.innerHTML='Non ci sono ancora Like in questo post <i class="fas fa-sad-tear"></i>';

		modalView.appendChild(noLike);
		modalView.classList.remove('hidden');
	}
	else{	
		for( let i=0; i<json.length; i++){

			//Si riempie opportunamente la modale
			let label = document.createElement('label');
			let nome = document.createElement('p');
			let img = document.createElement('img');
			
			img.src=json[i].image;
			nome.textContent=json[i].nome + " " + json[i].cognome;
			
			img.classList.add('like_img');
			
			div.appendChild(label);
			label.appendChild(img);
			label.appendChild(nome);
			
		}
		modalView.appendChild(div);
		modalView.classList.remove('hidden');	//Si visualizza la modale
	}
}

//Permette l'apertura delle foto in modalita modale
function modalPhoto(event){
	console.log("Function: modalPhoto")
	const src_image=event.currentTarget.src;

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
	modalView.addEventListener('click', onModalClick);	
}
			
//Non necessita spiegazione
function onResponse(response) {
    console.log("Siamo nella onResponse")
	console.log(response)
    return response.json();
}


//Carica i post inizialmente
fillPost();	

//Definisco la modale per poterla usare in più funzioni
const modalView= document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);		