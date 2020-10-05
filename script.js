const questions = [
    {
        number: 0,
        text: 'Kako se zove glavni grad Spanije?',
        answers: ['Berlin', 'Kijev', 'Madrid', 'Beograd'],
        trueAnswer: 'Madrid'
    },
    {
        number: 1,
        text: 'Kako se zove glavni grad Ceske?',
        answers: ['Berlin', 'Prag', 'Bratislava', 'Liberec'],
        trueAnswer: 'Prag'
    },
    {
        number: 2,
        text: 'Kako se zove glavni grad Madjarske?',
        answers: ['Budimpesta', 'Segedin', 'Grac', 'Bec'],
        trueAnswer: 'Budimpesta'
    },
    {
        number: 3,
        text: 'Kako se zove glavni grad Srbije?',
        answers: ['Novi Sad', 'Beograd', 'Nis', 'Kragujevac'],
        trueAnswer: 'Beograd'
    },
    {
        number: 4,
        text: 'Kako se zove glavni grad Francuske?',
        answers: ['Marsej', 'Pariz', 'Grac', 'Bec'],
        trueAnswer: 'Pariz'
    },
    {
        number: 5,
        text: 'Kako se zove glavni grad BiH?',
        answers: ['Sarajevo', 'Zvornik', 'Banja Luka', 'Bijeljina'],
        trueAnswer: 'Sarajevo'
    },
    {
        number: 6,
        text: 'Kako se zove glavni grad Slovacke?',
        answers: ['Prag', 'Trnava', 'Bratislava', 'Bec'],
        trueAnswer: 'Bratislava'
    },
    {
        number: 7,
        text: 'Kako se zove glavni grad Portugala?',
        answers: ['Portoiminese', 'Sevilja', 'Lisabon', 'Braga'],
        trueAnswer: 'Lisabon'
    },
    {
        number: 8,
        text: 'Kako se zove glavni grad Hrvatske?',
        answers: ['Pula', 'Beograd', 'Split', 'Zagreb'],
        trueAnswer: 'Zagreb'
    },
    {
        number: 9,
        text: 'Kako se zove glavni grad Slovenije?',
        answers: ['Ljubljana', 'Celje', 'Novo Mesto', 'Gorica'],
        trueAnswer: 'Ljubljana'
    }
]



const buttons = document.getElementsByClassName('btn');
const question = document.getElementById('question')
const id = 0
var array = []

function displayQuestion(id) {
    for(let i = 0; i < buttons.length; i++) {
        question.innerHTML = questions[id].text
        buttons[i].innerHTML = questions[id].answers[i]
        buttons[i].name = questions[id].answers[i];
        buttons[i].value = questions[id].number
        array.push(id)
    }
}

window.onload = displayQuestion(id)

document.querySelectorAll('.btn').forEach( item => {
    item.addEventListener('click', function(e){
        const btnName = e.target.name
        const btnValue = Number(e.target.value)

        if(questions.length != btnValue + 1) {
            checkAnswers(btnName, btnValue)
            displayQuestion(array[array.length - 1] + 1)
        }
        else {
            checkAnswers(btnName, btnValue)
            const content = document.getElementById('content')
            const final = document.getElementById('final')
            const finalScore = document.getElementById('finalScore')

            content.setAttribute('hidden','')
            final.removeAttribute('hidden')
            finalScore.innerHTML = score
        }
    })
})

var score = document.getElementById('score').value
document.getElementById('score').disabled = true

function checkAnswers(name, value) {
    if(questions[value].trueAnswer == name) {
        score = Number(score) + 10;
        document.getElementById('score').value = score
    }
    else {
        score = Number(score) - 5
        document.getElementById('score').value = score
    }
}

const btnPlayAgain = document.getElementById('playAgain')

btnPlayAgain.addEventListener('click', function() {
    array = []
    score = 0
    document.getElementById('score').value = score

    const content = document.getElementById('content')
    const final = document.getElementById('final')

    final.setAttribute('hidden','')
    content.removeAttribute('hidden')

    displayQuestion(0)
})