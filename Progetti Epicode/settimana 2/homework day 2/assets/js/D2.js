/*
REGOLE
- Tutte le risposte devono essere scritte in JavaScript
- Se sei in difficoltà puoi chiedere aiuto a un Teaching Assistant
- Puoi usare Google / StackOverflow ma solo quanto ritieni di aver bisogno di qualcosa che non è stato spiegato a lezione
- Puoi testare il tuo codice in un file separato, o de-commentando un esercizio alla volta
- Per farlo puoi utilizzare il terminale Bash, quello di VSCode o quello del tuo sistema operativo (se utilizzi macOS o Linux)
*/

/* ESERCIZIO 1
 Elenca e descrivi i principali datatype in JavaScript. Prova a spiegarli come se volessi farli comprendere a un bambino.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
document.getElementById('dataType').innerHTML = '<h1>!!!  I DATA TYPE  !!!</h1><p>la distinzione dei diversi tipi di dati utilizzati nel codice, e può avere due modalità: <strong>statica</strong> o <strong>dinamica.</strong> Nel primo caso, una variabile rimane strettamente legata al valore che in precedenza gli è stato assegnato. Nel secondo caso, una variabile dinamica può cambiare il dato che originariamente gli è stato assegnato.</p><ul><h2><strong>Esempi di Data Type:</strong></h2><li>String:<p>che serve ad indicare il singolo carattere, oppure una sequenza di caratteri</p></li><li>int:<p>che sta ad indicare un numero senza distinzione tra intero o decimale</p></li><li>Float:<p>identifica i numeri decimali</p></li><li>Bool:<p>che appartiene alla categoria delle tipologie booleane, che ammette solo due valori: Vero o Falso. questa tipizzazione va applicata a dei dati tipici dei controlli condizionali.</p></li></ul>'
/* ESERCIZIO 2
 Crea una variable chiamata "name" e assegna ad essa il tuo nome, sotto forma di stringa.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

const nome = 'Andrea';

document.getElementById('name').innerHTML = 'Andrea'

/* ESERCIZIO 3
 Scrivi il codice necessario ad effettuare un addizione (una somma) dei numeri 12 e 20.
*/
var numero = 12;
var numero1 = 20;

document.getElementById('calcolo').innerHTML = numero + numero1;

/* SCRIVI QUI LA TUA RISPOSTA */
 
/* ESERCIZIO 4
 Crea una variable di nome "x" e assegna ad essa il numero 12.
*/
var x = 12;

document.getElementById('x').innerHTML = x;
/* SCRIVI QUI LA TUA RISPOSTA */

/* ESERCIZIO 5
  Riassegna un nuovo valore alla variabile "name" già esistente: il tuo cognome.
  Dimostra l'impossibilità di riassegnare un valore ad una variabile dichiarata con il costrutto const.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

//nome = 'De Pasquale';

/* ESERCIZIO 6
 Esegui una sottrazione tra i numeri 4 e la variable "x" appena dichiarata (che contiene il numero 12).
*/

 numero = (4 - x);

 document.getElementById('numero').innerHTML = numero
/* SCRIVI QUI LA TUA RISPOSTA */

/* ESERCIZIO 7
 Crea due variabili: "name1" e "name2". Assegna a name1 la stringa "john", e assegna a name2 la stringa "John" (con la J maiuscola!).
 Verifica che name1 sia diversa da name2 (suggerimento: è la stessa cosa di verificare che la loro uguaglianza sia falsa).
 EXTRA: verifica che la loro uguaglianza diventi true se entrambe vengono trasformate in lowercase (senza cambiare il valore di name2!).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

var name1 = 'jhon';
var name2 = 'Jhon';

document.getElementById('call').innerHTML = (name1 === name2);

document.getElementById('verifica').innerHTML = (name1 === name2.toLowerCase())



