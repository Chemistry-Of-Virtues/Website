const getResults = (questions) => {
    let answered = true
    const traits = {
        'Openness To Experience': {
            'category': 'Big Five Personality Traits',
            'positive': 'Inventive/Curious',
            'negative': 'Consistent/Cautious',
            'value': 0
        },
        'Conscientiousness': {
            'category': 'Big Five Personality Traits',
            'positive': 'Easy-going/Careless',
            'negative': 'Efficient/Organized',
            'value': 0
        },
        'Extraversion': {
            'category': 'Big Five Personality Traits',
            'positive': 'Outgoing/Energetic',
            'negative': 'Solitary/Reserved',
            'value': 0
        },
        'Agreeableness': {
            'category': 'Big Five Personality Traits',
            'positive': 'Friendly/Compassionate',
            'negative': 'Challenging/Detached',
            'value': 0
        },
        'Neuroticism': {
            'category': 'Big Five Personality Traits',
            'positive': 'Secure/Confident',
            'negative': 'Sensitive/Nervous',
            'value': 0
        },
        'Mind': {
            'category': 'Personality Aspects',
            'positive': 'Internal Focused',
            'negative': 'External Focused',
            'value': 0
        },
        'Energy': {
            'category': 'Personality Aspects',
            'positive': 'Acute',
            'negative': 'Reasoning',
            'value': 0
        },
        'Nature': {
            'category': 'Personality Aspects',
            'positive': 'Intellectual Virtue',
            'negative': 'Moral Virtue',
            'value': 0
        },
        'Tactics': {
            'category': 'Personality Aspects',
            'positive': 'Decisive',
            'negative': 'Adaptive',
            'value': 0
        },
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
            traits[attribute].value += question.answer
        })
    })
    return JSON.stringify(traits)
}

module.exports = getResults