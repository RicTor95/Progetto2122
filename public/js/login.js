function validazione(event)
{
    // Verifica se tutti i campi sono riempiti
    if(form.username.value.length == 0 ||
       form.password.value.length == 0)
    {
        const errore= document.createElement('p');
        errore.classList.add('error');
        errore.textContent="Compilare tutti i campi!";
        event.preventDefault();

        const spazio = document.getElementById('spazio_errori');
        spazio.appendChild(errore);
    }
    else{
        const errore= document.getElementById('errore_campi');
        errore.innerHTML='';
    }
        
}

// Aggiunge il listener sul form
const form = document.forms['login'];

form.addEventListener('submit', validazione);