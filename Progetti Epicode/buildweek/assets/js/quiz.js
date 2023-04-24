const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

//variabili
window.addEventListener('load', function () {
    if (localStorage.getItem('accesso') != 1) {
        location.href = '../../index.html';
    }
})

var domanda;
var successi = 0;
var indiceDomanda = 0;
var indiceArray = 0;
var indicequestions = 0;
var index = 0;
const arrayRandomDomande = [];
const arrayRandomIndici = [];
const arrayRandomRisposte = [];
var elementA = document.getElementById('a');
var elementB = document.getElementById('b');
var elementC = document.getElementById('c');
var elementD = document.getElementById('d');

const timeS = document.querySelector('aside');
let timeSeconds = 30;
var barra = document.querySelector('circle');
timeS.innerHTML = ` ${timeSeconds}`;
let countDown = setInterval(() => {
    secondi = document.querySelector('#ss').style.strokeDashoffset = - 420 - (440 * timeSeconds) / 30;
    timeSeconds--;
    timeS.innerHTML = `${timeSeconds} `;
    if (timeSeconds <= 0 || timeSeconds < 1) {
        timeSeconds = 30;
        indiceArray++;
        controllo();
        quiz();
        inserisciTesto();
    }

}, 1000);


//richiamo funzioni
arrayDomande();
//indicizzazione()
quiz();
function quiz() {
    avanzamento(); // avanzamento dell'indice domanda 
    svuotaRisposte(); // svuota array risposte
    svuotaDomande();
    rispRandom(); // genera risposte
    DomRandom();
    inserisciTesto(); // scrivi domande e risposte
    progressi();
    boolean(); // adatta se booleano
    avanzamento(); // avanzamento dell'indice domanda 
    fine();// vai a pagina 3
    timeSeconds = 31;
}

confrontoA();
confrontoB();
confrontoC();
confrontoD();
//struttura funzioni

function arrayDomande() {
    for (i = 0; i < questions.length; i++) {
        index = Math.floor(Math.random() * questions.length)
        if (!arrayRandomIndici.includes(index)) {
            arrayRandomIndici.push(index);
        } else {
            i = i - 1;
        }
    }
    index = 0;
    console.log(arrayRandomIndici);
}
/*
function arrayDomande() {
    for (i = questions.length - 1; i > 0; i--) {
        index = Math.floor(Math.random() * (i+1))
        if (!arrayRandomIndici.includes(index)) {
            arrayRandomIndici.push(index);
        } else {
            i++
        }
    }
    index = 0
    //console.log(arrayRandomIndici)
}
*/
function rispRandom() {
    arrayRandomRisposte.push(questions[indicequestions].correct_answer);
    for (k = 0; k < questions[indicequestions].incorrect_answers.length; k++) {
        arrayRandomRisposte.push(questions[indicequestions].incorrect_answers[k]);
    }
    arrayRandomRisposte.sort();
    console.log('risposte');
    console.log(arrayRandomRisposte);
    console.log(indicequestions);
}

function DomRandom() {
    arrayRandomDomande.push(questions[indicequestions].question);

    console.log('domande');
    console.log(arrayRandomDomande);
    console.log(indicequestions);
}

function avanzamento() {
    indicequestions = arrayRandomIndici[indiceArray];
    console.log(indicequestions);
}

function inserisciTesto() {
    document.getElementById('domanda').innerHTML = arrayRandomDomande[indiceArray];
    elementA.innerHTML = arrayRandomRisposte[0];
    elementB.innerHTML = arrayRandomRisposte[1];
    elementC.innerHTML = arrayRandomRisposte[2];
    elementD.innerHTML = arrayRandomRisposte[3];
}

function boolean() {
    if (questions[indicequestions].type == 'boolean') {
        elementC.style.display = 'none';
        elementD.style.display = 'none';
    } else {
        elementC.style.display = 'inline-block';
        elementD.style.display = 'inline-block';
    }
}

function svuotaRisposte() {
    for (k = 0; k < arrayRandomRisposte.length + 2; k++)
        arrayRandomRisposte.pop();
}

function svuotaDomande() {
    for (k = 0; k < arrayRandomDomande.length + 2; k++)
        arrayRandomRisposte.pop();
}

function confrontoA() {
    elementA.addEventListener('click', function (event) {
        
        if (elementA.textContent == questions[indicequestions].correct_answer) {
            successi++;
        }
        indiceArray++;
        controllo();
        quiz();
    })
/* PROCO DIO */
};

function confrontoB() {
    elementB.addEventListener('click', function (event) {
        
        if (elementB.textContent == questions[indicequestions].correct_answer) {
            successi++;
        }
        indiceArray++;
        controllo();
        quiz();
    })

};

function confrontoC() {
    elementC.addEventListener('click', function (event) {
        
        if (elementC.textContent == questions[indicequestions].correct_answer) {
            successi++;
        }
        indiceArray++;
        controllo();
        quiz();
    })

};

function confrontoD() {
    elementD.addEventListener('click', function (event) {
       
        if (elementD.textContent == questions[indicequestions].correct_answer) {
            successi++;
        }
        indiceArray++;
        controllo();
        quiz();
    })

};


function fine() {
    indiceDomanda++;
}

function indicizzazione() {
    indicequestions = arrayRandomIndici[0];
}

function controllo() {
    if (indiceDomanda >= questions.length) {
        localStorage.setItem('successi', successi);
        localStorage.setItem('indicedomande', indiceDomanda);
        location.href = ('../../result.html');
    }
    console.log('esatte: ' + successi);
}

function progressi() {
    document.getElementById('progresso').innerHTML = `QUESTION ${indiceDomanda + 1}<span style="color: #d20094" > / 10<span>`;
};


/*event.preventDefault();*/
