const adminLoginForm = document.getElementById('admin-login')
const clientLoginForm = document.getElementById('client-login')
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
            console.log('Invalid Credentials')
        } else {
            console.log('Unknown Error')
        }
    }).catch((e) => {
        console.log('Failed!', e)
        return
    })
})