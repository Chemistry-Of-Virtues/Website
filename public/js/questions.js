const getQuestionsURL = '/iap/demo'
const getResultsURL = '/iap/demo/result'
let questions = []
let results = ''

const $submitQuestions = document.getElementById('submit-questions')

const postQuestions = async (data) => {
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

const displayQuestion = (question, index) => {
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
        $answerField.name = question.question

        $answerField.value = (i - 3)
        $answerField.id = `${index}${i}`
        $answerTitle.htmlFor = `${index}${i}`
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
    $questionForm.id = `question-form-${index}`
    $questionForm.appendChild($answers)
    $questionsSection.appendChild($questionForm)

}

const displayResults = (results) => {
    for (const category in results) {
        const $result = document.createElement('div')
        const $resultTitle = document.createElement('h3')
        const $resultScale = document.createElement('div')
        const $resultPositive = document.createElement('p')
        const $resultNegative = document.createElement('p')
        const $resultText = document.createElement('p')
        const $results = document.getElementById('results')

        $resultTitle.innerHTML = category
        $resultPositive.innerHTML = results[category].positive
        $resultNegative.innerHTML = results[category].negative
        $resultText.innerHTML = results[category].value

        $resultTitle.className = 'result-title'
        $resultText.className = 'result-text'
        $resultScale.className = 'result-scale'
        $result.className = 'result'

        $resultScale.appendChild($resultPositive)
        $resultScale.appendChild($resultNegative)

        $result.appendChild($resultTitle)
        $result.appendChild($resultText)
        $result.appendChild($resultScale)

        $results.appendChild($result)
    }
}

const submitQuestions = (questions) => {
    let allQuestionsCompleted = true;
    questions.forEach((question) => {
        if (document.querySelector(`input[name="${question.question}"]:checked`)) {
            question.answer = document.querySelector(`input[name="${question.question}"]:checked`).value
        } else {
            // Added for dev
            question.answer = '-2'

            // Removed for dev
            // allQuestionsCompleted = false
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
    questions.forEach((question, index) => {
        displayQuestion(question, index)
    })

    $submitQuestions.addEventListener('click', async () => {
        if (submitQuestions(questions)) {  
            await postQuestions(submitQuestions(questions))
            document.getElementById('questions').parentNode.removeChild(document.getElementById('questions'))
            document.getElementById('submit-questions').parentNode.removeChild(document.getElementById('submit-questions')) 
            displayResults(results) 
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        } else {
            alert('Please answer all of the questions before submitting!')
        }
    })
}

getQuestions()