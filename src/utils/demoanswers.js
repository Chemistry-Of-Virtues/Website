const getResults = (questions) => {
    let answered = true
    questions.forEach((question) => {
        if (question.answer == "") {
            answered = false
        }
    })
    if (!answered) {
        return 'Please answer all of the questions before submitting!'
    }
    return 'You answered all of the questions!'
}

module.exports = getResults