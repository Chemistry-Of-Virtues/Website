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
    const $answerScale = document.createElement('div')
    const $answerScaleLabelPositive = document.createElement('p')
    const $answerScaleLabelNegative = document.createElement('p')

    $questionText.innerHTML = question.question
    $questionForm.appendChild($questionText)
    $answers.className = 'answers'
    $answerScale.className = 'answer-scale'

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
                $answerTitle.innerHTML = ""
                break;
            case 2:
                $answerTitle.innerHTML = ""
                break;
            case 3:
                $answerTitle.innerHTML = ""
                break;
            case 4:
                $answerTitle.innerHTML = ""
                break;
            case 5:
                $answerTitle.innerHTML = ""
                break;
        }
        $answer.className = 'answer'
        $answer.appendChild($answerField)
        $answer.appendChild($answerTitle)
        $answers.appendChild($answer)
    }
    $answerScaleLabelNegative.innerHTML = 'Strongly Disagree'
    $answerScaleLabelPositive.innerHTML = 'Strongly Agree'

    $answerScale.appendChild($answerScaleLabelNegative)
    $answerScale.appendChild($answerScaleLabelPositive)
    $questionForm.id = `question-form-${index}`
    $questionForm.appendChild($answers)
    $questionForm.appendChild($answerScale)
    $questionsSection.appendChild($questionForm)

}

const displayResults = (results) => {
let i = 0

    for (const category in results) {
        if (i < 9) {
            const graph = document.createElement('div')
            const bars = document.createElement('div')
            const title = document.createElement('h3')
            const negativeBar = document.createElement('div')
            const positiveBar = document.createElement('div')
            const scale = document.createElement('div')
            const negativeScale = document.createElement('p')
            const positiveScale = document.createElement('p')
            const toggleDescriptions = document.createElement('div')
            const toggleDescriptionsText = document.createElement('h4')
            const descriptions = document.createElement('div')
            const negativeDescription = document.createElement('p')
            const positiveDescription = document.createElement('p')

            negativeScale.innerHTML = results[category].negative
            positiveScale.innerHTML = results[category].positive
            negativeDescription.innerHTML = results[category].negative + ': ' + results[category].negativeParagraph
            positiveDescription.innerHTML = results[category].positive + ': ' + results[category].positiveParagraph
            toggleDescriptionsText.innerHTML = 'Show More'
            title.innerHTML = category

            graph.className = 'graph'
            bars.className = 'bars'
            negativeBar.className = 'negative-bar'
            positiveBar.className = 'positive-bar'
            scale.className = 'scale'
            toggleDescriptions.className = 'toggle-descriptions'
            toggleDescriptionsText.className = 'toggle-descriptions-text'
            descriptions.className = 'descriptions'
            negativeDescription.className = 'negative-description'
            positiveDescription.className = 'positive-description'

            // Graph bar sizing
            const cssPercentageModifier = 0.63
            const totalPossible = results[category].totalPossible
            const percentagePositive = ((results[category].value + totalPossible) / (totalPossible * 2)) * 100
            const percentageNegative = ((-results[category].value + totalPossible) / (totalPossible * 2)) * 100

            positiveBar.style.height = `${percentagePositive * cssPercentageModifier}%`
            negativeBar.style.height = `${percentageNegative * cssPercentageModifier}%`

            $('#results').append(graph)
            graph.append(title, bars, scale, toggleDescriptions, descriptions)
            descriptions.append(negativeDescription, positiveDescription)
            scale.append(negativeScale, positiveScale)
            bars.append(negativeBar, positiveBar)
            toggleDescriptions.append(toggleDescriptionsText)
        } else {

        }
        i++
    }


    // category
    // positive
    // negative
    // positiveParagraph
    // negativeParagraph
    // value
    // totalPossible 


    // for (const category in results) {
    //     const $result = document.createElement('div')
    //     const $resultTitle = document.createElement('h3')
    //     const $resultScale = document.createElement('div')
    //     const $resultPositive = document.createElement('p')
    //     const $resultNegative = document.createElement('p')
    //     const $resultText = document.createElement('p')
    //     const $results = document.getElementById('results')
    //     const $descriptiveParagraph = document.createElement('p')

    //     if (results[category].value > 0) {
    //         if (results[category].positiveParagraph) {
    //             $descriptiveParagraph.innerHTML = results[category].positiveParagraph
    //         }
    //     } else if (results[category].value < 0) {
    //         if (results[category].negativeParagraph) {
    //             $descriptiveParagraph.innerHTML = results[category].negativeParagraph
    //         }
    //     }

    //     $resultTitle.innerHTML = category
    //     $resultPositive.innerHTML = results[category].positive
    //     $resultNegative.innerHTML = results[category].negative
    //     $resultText.innerHTML = results[category].value

    //     $descriptiveParagraph.className = 'result-description'
    //     $resultTitle.className = 'result-title'
    //     $resultText.className = 'result-text'
    //     $resultScale.className = 'result-scale'
    //     $result.className = 'result'

    //     $resultScale.appendChild($resultNegative)
    //     $resultScale.appendChild($resultPositive)

    //     $result.appendChild($resultTitle)
    //     $result.appendChild($resultText)
    //     $result.appendChild($resultScale)
    //     if (results[category].positiveParagraph) {
    //         $result.appendChild($descriptiveParagraph)
    //     }

    //     $results.appendChild($result)
    // }
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
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            document.getElementById('questions').parentNode.removeChild(document.getElementById('questions'))
            document.getElementById('submit-questions').parentNode.removeChild(document.getElementById('submit-questions'))
            displayResults(results)    
            $('.toggle-descriptions').click(function () {
                $(this).next().slideToggle(100)
                $(this).children("h4").text($(this).children("h4").text() == 'Show More' ? 'Show Less' : 'Show More')
            })
        } else {
            alert('Please answer all of the questions before submitting!')
        }
    })
}

getQuestions()