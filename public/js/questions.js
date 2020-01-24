const getQuestionsURL = '/iap/demo'
const getResultsURL = '/iap/demo/result'
let questions = []
let results = ''

const $submitQuestions = document.getElementById('submit-questions')

const postQuestions = async (data) => {
    console.log(data)
    await fetch(getResultsURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).then((json) => {
        results = json
    }).catch((e) => {
        console.log(e)
    })
}

const displayQuestion = (question) => {
    const $questionsSection = document.getElementById('questions')
    const $questionForm = document.createElement('form')
    const $questionText = document.createElement('h3')
    const $answers = document.createElement('div')

    $questionText.innerHTML = question.question
    $questionForm.appendChild($questionText)
    $answers.className = 'answers'

    for (let i = 1; i < 6; i++) {
        const $answer = document.createElement('div')
        const $answerField = document.createElement('input')
        const $answerTitle = document.createElement('label')
            
        $answerField.type = 'radio'
        $answerField.name = question.number

        $answerField.value = i
        $answerField.id = `${question.number}${i}`
        $answerTitle.htmlFor = `${question.number}${i}`
        switch (i) {
            case 1:
                $answerTitle.innerHTML = "Strongly Disagree"
                break;
            case 2:
                $answerTitle.innerHTML = "Somewhat Disagree"
                break;
            case 3:
                $answerTitle.innerHTML = "Neutral"
                break;
            case 4:
                $answerTitle.innerHTML = "Somewhat Agree"
                break;
            case 5:
                $answerTitle.innerHTML = "Strongly Agree"
                break;
        }
        $answer.className = 'answer'
        $answer.appendChild($answerField)
        $answer.appendChild($answerTitle)
        $answers.appendChild($answer)
    }
    $questionForm.id = `question-form-${question.number}`
    $questionForm.appendChild($answers)
    $questionsSection.appendChild($questionForm)

}

const displayResults = (results) => {
    const resultText = document.createElement('p')
    resultText.innerHTML = results
    document.getElementById('results').appendChild(resultText)
}

const submitQuestions = (questions) => {
    let allQuestionsCompleted = true;
    questions.forEach((question) => {
        if (document.querySelector(`input[name="${question.number}"]:checked`)) {
            question.answer = document.querySelector(`input[name="${question.number}"]:checked`).value
        } else {
            allQuestionsCompleted = false
        }
    })
    return allQuestionsCompleted ? questions : false
}

const getQuestions = async () => {
    await fetch(getQuestionsURL).then((res) => {
        return res.json()
    }).then((json) => {
        json.forEach((question) => {
            questions.push(question)
        })
        return
    })
    // Code to use questions here
    questions.forEach((question) => {
        displayQuestion(question)
    })

    $submitQuestions.addEventListener('click', async () => {
        if (submitQuestions(questions)) {  
            await postQuestions(submitQuestions(questions))
            document.getElementById('questions').parentNode.removeChild(document.getElementById('questions'))
            document.getElementById('submit-questions').parentNode.removeChild(document.getElementById('submit-questions')) 
            displayResults(results) 
        } else {
            alert('Please answer all of the questions before submitting!')
        }
    })
}

getQuestions()