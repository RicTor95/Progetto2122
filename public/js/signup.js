function validazione(event) {
    // Verifica se tutti i campi sono riempiti
    if (form.nome.value.length == 0 ||
        form.cognome.value.length == 0 ||
        form.email.value.length == 0 ||
        form.password.value.length == 0 ||
        form.username.value.length == 0 ||
        form.c_password.value.length == 0) {

        const error= document.getElementById('errore_campi');
        error.classList.remove('hidden');
        event.preventDefault();
        // Blocca l'invio del form
        event.preventDefault();
    }
    //Controlla che password e conferma password siano uguali
    if (form.password.value !== form.c_password.value) {
        console.log("Errore password")
        const error= document.getElementById('passw_error');
        error.classList.remove('hidden');
        // Blocca l'invio del form
        event.preventDefault();
    }
    //Controlla che il formato dell email sia corretto
    if ((form.email.value.indexOf("@") < 1) || 
        ((form.email.value.indexOf(".")-(form.email.value.indexOf("@")) < 1))) {
        console.log("Errore email")
        const error= document.getElementById('email_error');
        error.classList.remove('hidden');
        event.preventDefault();
    }
    else{
        const error= document.getElementById('email_error');
        error.classList.add('hidden');
    }
    //Non permette l'invio del form se l'username non è libero
    if (user_taken === true) {
        console.log("Errore username")
        const error= document.getElementById('username_error');
        error.classList.remove('hidden');
        event.preventDefault();
    }
}
 
//Funzione che controlla se l'username è libero

function check_username(event) {
    console.log("Sono nella fetch")
    url = 'http://localhost/HW1/search_username.php?username=' + usr.value;
    console.log("questo è l'url" + url)

    fetch(BASE_URL +'check_username/' +usr.value).then(onResponse).then(onJson);
}

function onResponse(response) {
    console.log("Siamo nella onResponse")
    return response.json();
}

//In caso l'username è occupato spunta un simbolo che farà capire l'errore
function onJson(json) {
    console.log("Sono nella json, json ricevuto! ");
    console.log(json);
    if (json[0] == 0) {
        // Blocca l'invio del form
        user_taken = true;
        const error= document.getElementById('username_error');
        console.log("hidden tolto")
        error.classList.remove('hidden');
    } else {
        user_taken = false;
        const error= document.getElementById('username_error');
        console.log("hidden mess")
        error.classList.add('hidden');
   }
}

let user_taken;		//Variabile che permette di verificare se quel nome è già occupato
// Riferimento al form
const form = document.forms['registrazione'];
// Aggiungi listener
form.addEventListener('submit', validazione);
const usr = form.username;
usr.addEventListener('blur', check_username);
//Per il simbolo di errore, che inizialmete lo nascondo
const i_type= document.querySelectorAll('i');
for(let i=0; i<i_type.length; i++)
    i_type[i].classList.add('hidden'); 