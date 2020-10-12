var api = document.getElementById('api')
var score = 0

function displayQuestion(id) {
    const element = `
    <div id="question">
        ${questions[id].text}
    </div>
    `

    api.innerHTML = element
}

function displayAnswers(id) {
    for(let i = 0; i < questions[id].answers.length; i++) {
        const btn = `
        <button name=${questions[id].answers[i]} value=${questions[id].number} class="btn"> ${questions[id].answers[i]} </button>
    `
    const position = 'beforeend'
    api.insertAdjacentHTML(position, btn)
    }
}

function displayScore(score) {
    const scoreElement = `
        <p> Rezultat:  ${score} </p>
    `
    const position = 'beforeend'
    api.insertAdjacentHTML(position, scoreElement)
}

function displayContent(id) {
    displayQuestion(id)
    displayAnswers(id)
    displayScore(score)

    const btnElements = document.querySelectorAll('.btn')

    btnElements.forEach( btn => {
        btn.addEventListener('click', function(e) {
            const name = e.target.name
            const value = e.target.value
            checkAnswers(name, value)
            nextQuestion(id)
        })
    })
}

function checkAnswers(name, value) {
    if(questions[value].trueAnswer == name) {
        score = score + 10;
    }
    else {
        score = score - 5
    }
}

function endQuiz(score) {
    const  btnElements = document.querySelectorAll('.btn')
    const finalElement = `
        <div> 
            <p id="finalEl"> Vas konacan rezultat je:  ${score} </p>
            <button id="btnPlayAgain">  Igraj ponovo </button>
        </div>
    `

    btnElements.forEach(btn=> {
        btn.disabled = true
    })

    api.insertAdjacentHTML('beforeend', finalElement)
}

function playAgain(id) {
    const btnPlayAgain = document.getElementById('btnPlayAgain')
    btnPlayAgain.addEventListener('click', function(){
        displayContent(id)
    })
}

function nextQuestion(id) {
    id = id + 1
    displayContent(id)

    const  btnElements = document.querySelectorAll('.btn')
    btnElements.forEach( btn => {
        btn.addEventListener('click', function(e) {
            const value = e.target.value
            const numOfQuestions = questions.length

            if(value == numOfQuestions - 1) {
                endQuiz(score)
                id = 0
                score = 0
                playAgain(id)
            }
        })
    })
}