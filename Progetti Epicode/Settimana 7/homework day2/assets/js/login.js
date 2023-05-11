
//ESERCIZIO 1 

const nome = document.querySelector('#FirstName');
const cognome = document.querySelector('#LastName');
const sBtn = document.getElementById('btn');
const clearBtn = document.getElementById('removeSaved');


let rubricaList = [];



sBtn.addEventListener('click' , function(e){
    e.preventDefault()
    let name = nome.value
    let surname = cognome.value
    let login = `${name} ${surname}`
    
//salvataggio in local storage degli input salvati
localStorage.setItem('inputSaved', login)

rubricaList.push(login)

//richiamo della fuzione 
rubrica()

//pulire i campi di placeholder
nome.value = ''
cognome.value = ''



 
})


//rimozione del sBtn 

clearBtn.addEventListener('click', function(){
    localStorage.removeItem('inputSaved')
    nome.value = ''
    cognome.value = ''
})

//mandare a schermo i contatti salvati e lasciarli a storage ogni volta che si ricarica la pagina


const rubrica = () => {
    let lista = document.querySelector('ul')


    lista.innerHTML = ''
    //seleziono la lista
    rubricaList.forEach(() => {
        const newLi = document.createElement('li')

        newLi.innerHTML = rubricaList

        lista.appendChild(newLi)
        
    })
}

/*window.onload = function () {
    if(localStorage.getItem(rubricaList)){
        let arrayStinga = localStorage.getItem('rubricaList')
         let newRubricaArray  = JSON.
    }
}


//timer*/
