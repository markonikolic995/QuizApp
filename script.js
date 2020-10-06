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

const api = document.getElementById('api')
const id = 0
var array = []
var score = 0

const question = document.createElement("DIV")
const answer = document.createElement("BUTTON")

function displayQuestion(id) {
    const textQuestion = document.createTextNode(questions[id].text)
    question.appendChild(textQuestion)
    question.setAttribute('id','question')
    document.getElementById('api').appendChild(question)
}

function displayAnswers(id) {
    for(let i = 0; i < questions[id].answers.length; i++) {
        const answer = document.createElement("BUTTON")
        const textAnswer = document.createTextNode(questions[id].answers[i])
        answer.appendChild(textAnswer)
        answer.setAttribute('class','btn')
        answer.name = questions[id].answers[i]
        answer.value = id
        document.getElementById('api').appendChild(answer)
    }
}

function displayScore(score) {
    const scoreEl = document.createElement("INPUT")
    scoreEl.setAttribute('type', 'number')
    scoreEl.setAttribute('id', 'score')
    scoreEl.setAttribute('value',score)
    document.getElementById('api').appendChild(scoreEl)
}


function displayContent(id) {
    displayQuestion(id)
    displayAnswers(id)
    displayScore(0)
    array.push(id)
}


window.onload = displayContent(id)

function nextQuestion(num) {
    document.getElementById('question').innerHTML = questions[num].text
}

function nextAnswers(num) {
    const answers = document.getElementsByClassName('btn')
    for(let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = questions[num].answers[i]
        answers[i].value = num
        answers[i].name = questions[num].answers[i]
    }
}

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

function finalScore(scr) {
    const btnAgain = document.createElement("BUTTON")
    const paragraph = document.createElement("P")
    const textParagraph = document.createTextNode('Vas konacan rezultat je:' + scr)
    const textButton = document.createTextNode('Igraj ponovo')
    paragraph.appendChild(textParagraph)
    btnAgain.appendChild(textButton)
    document.getElementById('api').appendChild(paragraph)
    document.getElementById('api').appendChild(btnAgain)
    paragraph.setAttribute('id','final')
    btnAgain.setAttribute('id','again')
    document.getElementById('score').disabled = true

    for(let i = 0; i < document.getElementsByClassName('btn').length; i++) {
        document.getElementsByClassName('btn')[i].disabled = true
    }

    document.getElementById('again').addEventListener('click',function(){
        displayScore(0)
        score = 0
        document.getElementById('final').remove()
        document.getElementById('again').remove()
        for(let i = 0; i < document.getElementsByClassName('btn').length; i++) {
            document.getElementsByClassName('btn')[i].disabled = false
        }
        array = []

        nextQuestion(id)
        nextAnswers(id)
        array.push(id)
    })
}



document.querySelectorAll('.btn').forEach(item => {
    item.addEventListener('click', function(e){
        const value = e.target.value
        const name = e.target.name
        checkAnswers(name, value)
        displayScore(score)

        if(questions.length != Number(value) + 1){
            nextQuestion(array[array.length - 1] + 1)
            nextAnswers(array[array.length -1] + 1)
            array.push(array[array.length -1] + 1)
        }
        else {
            finalScore(score)
        }
    })
})

