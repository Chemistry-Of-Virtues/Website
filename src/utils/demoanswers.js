const getResults = (questions) => {
    let answered = true
    const traits = {
        'Openness To Experience': {
            'category': 'Big Five Personality Traits',
            'positive': 'Curious',
            'negative': 'Cautious',
            'value': 0
        },
        'Conscientiousness': {
            'category': 'Big Five Personality Traits',
            'positive': 'Careless',
            'negative': 'Organized',
            'value': 0
        },
        'Extraversion': {
            'category': 'Big Five Personality Traits',
            'positive': 'Outgoing',
            'negative': 'Reserved',
            'value': 0
        },
        'Agreeableness': {
            'category': 'Big Five Personality Traits',
            'positive': 'Friendly',
            'negative': 'Detached',
            'value': 0
        },
        'Neuroticism': {
            'category': 'Big Five Personality Traits',
            'positive': 'Secure',
            'negative': 'Sensitive',
            'value': 0
        },
        'Mind': {
            'category': 'Personality Aspects',
            'positive': 'Internal',
            'negative': 'External',
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
            'positive': 'Intellectual',
            'negative': 'Moral',
            'value': 0
        },
        'Tactics': {
            'category': 'Personality Aspects',
            'positive': 'Decisive',
            'negative': 'Adaptive',
            'value': 0
        },
        'Abusive': {
            'category': 'Issues and Behaviors',
            'positive': 'Awareness/Professional Help/Finding Purpose',
            'negative': 'Emotional and/or Physical',
            'value': 0
        },
        'Addiction': {
            'category': 'Issues and Behaviors',
            'positive': 'Use Purpose and Virtue to Overcome',
            'negative': 'Substance or Behavioral',
            'value': 0
        },
        'Depression': {
            'category': 'Issues and Behaviors',
            'positive': 'Awareness/Professional Help/Finding Purpose',
            'negative': 'Chemical Imbalance & Situational',
            'value': 0
        },
        'Anger': {
            'category': 'Issues and Behaviors',
            'positive': 'Anger Towards Self & Others',
            'negative': 'Awareness and Conscious Choice of Action',
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
            if (traits[attribute.name]) {
                traits[attribute.name].value += parseInt(question.answer)
            } else {
                console.log(`${attribute.name} does not exist.`)
            }
        })
    })
    return JSON.stringify(traits)
}

module.exports = getResults