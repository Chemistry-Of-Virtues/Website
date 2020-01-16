const getQuestionsURL = '/iap/demo'
const getResultsURL = '/iap/demo/result'
const questions = []

const postQuestions = async (data) => {
    fetch(getResultsURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json)
    })
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
    // Test comment

    // Call to post questions when answers are retreived from the user
    postQuestions(questions)
}

getQuestions()