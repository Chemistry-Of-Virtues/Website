const adminLoginForm = document.getElementById('admin-login')
const clientLoginForm = document.getElementById('client-login')
const adminFormActiveButton = document.getElementById('admin-form-active-button')
const clientFormActiveButton = document.getElementById('client-form-active-button')
const adminValidationURL = '/admin/login'
const clientValidationURL = '/client/login'
const adminLandingPageURL = '/public/admin-landing-page.html'

// Put following two lines in client event listener
const clientUsername = document.getElementById('client-username').value
const clientPassword = document.getElementById('client-password').value

// Securing Cookies Maybe?
document.cookie = ';secure;samesite=strict;max-age=20;'

adminLoginForm.addEventListener('submit', async (e) => {
    const adminUsername = document.getElementById('admin-username').value
    const adminPassword = document.getElementById('admin-password').value

    const adminCredentials = {
        userName: adminUsername,
        password: adminPassword
    }

    e.preventDefault()

    await fetch(adminValidationURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminCredentials)
    }).then((res) => {
        if (res.status === 200) {
            console.log('Logged In Successfully. Redirecting...')
            // Redirect to Landing Page Here
            window.location.href = '/admin-landing-page.html'
        } else if (res.status === 400) {
            // Replace with banner or something...
            alert('Invalid Username or Password')
        } else {
            console.log('Unknown Error')
        }
    }).catch((e) => {
        console.log('Failed!', e)
        return
    })
})

clientLoginForm.addEventListener('submit', async (e) => {
    const clientUsername = document.getElementById('client-username').value
    const clientPassword = document.getElementById('client-password').value

    const clientCredentials = {
        userName: clientUsername,
        password: clientPassword
    }

    e.preventDefault()

    await fetch(clientValidationURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientCredentials)
    }).then((res) => {
        if (res.status === 200) {
            console.log('Logged In Successfully. Redirecting...')
            // Redirect to Landing Page Here
            // window.location.href = '/client-landing-page.html'
        } else if (res.status === 400) {
            // Replace with banner or something...
            alert('Invalid Username or Password')
        } else {
            console.log('Unknown Error')
        }
    }).catch((e) => {
        console.log('Failed!', e)
        return
    })
})

adminFormActiveButton.addEventListener('click', () => {
    adminFormActiveButton.classList.remove('inactive-account-type')
    clientFormActiveButton.classList.add('inactive-account-type')
    clientFormActiveButton.classList.remove('active-account-type')
    adminFormActiveButton.classList.add('active-account-type')  
    adminLoginForm.style.display = 'flex'
    clientLoginForm.style.display = 'none'
})

clientFormActiveButton.addEventListener('click', () => {
    clientFormActiveButton.classList.remove('inactive-account-type')
    adminFormActiveButton.classList.add('inactive-account-type')  
    adminFormActiveButton.classList.remove('active-account-type')
    clientFormActiveButton.classList.add('active-account-type') 
    clientLoginForm.style.display = 'flex'
    adminLoginForm.style.display = 'none'
})