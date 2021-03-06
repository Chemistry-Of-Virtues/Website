const traits = require('./traits')

const getResults = (questions) => {
    let answered = true

    // Reset traits
    for (trait in traits) {
        traits[trait].value = 0
    }

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
    questions.forEach((question) => {
        question.attributes.forEach((attribute) => {
            if (traits[attribute.name]) {
                if (attribute.reversed) {
                    traits[attribute.name].value -= parseInt(question.answer)
                } else {
                    traits[attribute.name].value += parseInt(question.answer)
                }
            } else {
                console.log(`${attribute.name} does not exist.`)
            }
        })
    })
    return JSON.stringify(traits)
}

module.exports = getResults