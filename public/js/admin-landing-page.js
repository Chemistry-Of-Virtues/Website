const clientsOverview = document.getElementById('clients-overview')
const clientForm = document.getElementById('create-client')
let clients = []

const parseCookies = x => x
    .split(';')
    .map(e => e.trim().split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

const showAddClientForm = () => {
    clientForm.style.display = 'flex'
}

const closeAddClientForm = () => {
    clientForm.style.display = 'none'
}

const removeClient = async (clientUserName) => {
    await fetch('/client', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`,
            'Content-Type': 'application/json'       
        },
        body: JSON.stringify({ userName: clientUserName })
    }).catch((e) => {
        console.log('Fetch DELETE to /client failed with error:', e)
    })

    clientsOverview.innerHTML = ''
    fetchClients()
}

const logout = async () => {
    await fetch('/admin/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`
        }
    })
    window.location.href = '/login.html'
}

const logoutAll = async () => {
    await fetch('/admin/logoutall', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`
        }
    })
    window.location.href = '/login.html'
}

const fetchClients = async () => {
    await fetch('/admin/clients', {
        headers: {
            'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`
        }
    }).then((res) => {
        return res.json()
    }).then((json) => {
        clients = json
    })

    // Do things with clients here
    clients.forEach((client) => {
        const $clientCard = document.createElement('div')
        const $clientInfo = document.createElement('div')
        const $clientName = document.createElement('h3')
        const $clientEmail = document.createElement('p')
        const $removeClient = document.createElement('button')

        $clientCard.className = 'client-card'
        $clientName.className = 'client-name'
        $clientEmail.className = 'client-email'
        $removeClient.className = 'remove-client'

        $clientName.innerHTML = `${client.firstName} ${client.lastName}`
        $clientEmail.innerHTML = client.email
        $removeClient.innerHTML = '×'
        $removeClient.addEventListener('click', (e) => {
            clientName = ``
            if (confirm(`Are you sure you want to permanantly remove ${client.firstName} ${client.lastName}? This cannot be undone!`)) {
                removeClient(client.userName)
            }
        })

        $clientInfo.appendChild($clientName)
        $clientInfo.appendChild($clientEmail)
        $clientCard.appendChild($clientInfo)
        $clientCard.appendChild($removeClient)
        clientsOverview.appendChild($clientCard)
    })
}

document.getElementById('create-client-form').addEventListener('submit', async (e) => {
    console.log('Create Client...')
    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const userName = document.getElementById('user-name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const verifyPassword = document.getElementById('verify-password').value

    if (password !== verifyPassword) {
        alert('Passwords must match!')
    }

    const clientData = {
        firstName,
        lastName,
        userName,
        email,
        password
    }

    e.preventDefault()

    await fetch('/client', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(clientData)
    }).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json)
    }).catch((e) => {
        console.log('Error POST to /client:', e)
    })

    clientsOverview.innerHTML = ''
    fetchClients()
    closeAddClientForm()
})

fetchClients()