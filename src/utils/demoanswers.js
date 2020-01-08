const getResults = (questions) => {
    let answered = true
    questions.forEach((question) => {
        if (question.answer === "") {
            answered = false
        }
    })
    if (!answered) {
        return JSON.stringify('Please answer all of the questions before submitting!')
    } else if (questions.length === 0) {
        return JSON.stringify('No questions were submitted!')
    }
    return JSON.stringify('You answered all of the questions!')
}

module.exports = getResults