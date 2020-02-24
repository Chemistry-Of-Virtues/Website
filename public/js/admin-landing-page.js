const clientOverview = document.getElementById('client-overview')
const clientsSidebar = document.getElementById('clients')
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

    document.getElementById('client-name-header').innerHTML = 'Select a client to view.'
    document.getElementById('title-bar').removeChild(document.getElementById('title-bar').lastChild)
    clientOverview.innerHTML = ''
    clientsSidebar.innerHTML = ''
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
        const $clientName = document.createElement('h3')

        $clientCard.className = 'client-card'
        $clientName.className = 'client-name'

        $clientName.innerHTML = `${client.firstName} ${client.lastName}`

        $clientCard.addEventListener('click', () => {
            const clientNameHeader = document.getElementById('client-name-header')
            const titleBar = document.getElementById('title-bar')
            const deleteClient = document.createElement('button')

            deleteClient.id = 'remove-client'
            deleteClient.className = 'remove-client'
            deleteClient.innerHTML = 'Delete This Client'
            deleteClient.addEventListener('click', (e) => {
                clientName = ``
                if (confirm(`Are you sure you want to permanantly remove ${client.firstName} ${client.lastName}? This cannot be undone!`)) {
                    removeClient(client.userName)
                }
            })

            const deleteClientButton = document.getElementById('remove-client')

            if (titleBar.contains(deleteClientButton)) {
                titleBar.removeChild(titleBar.lastChild)
            }

            clientNameHeader.innerHTML = `${client.firstName} ${client.lastName}`

            titleBar.appendChild(deleteClient)
        })

        $clientCard.appendChild($clientName)
        clientsSidebar.appendChild($clientCard)
    })
}

document.getElementById('create-client-form').addEventListener('submit', async (e) => {
    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const userName = document.getElementById('user-name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const verifyPassword = document.getElementById('verify-password').value
    e.preventDefault()

    if (password !== verifyPassword) {
        alert('Passwords must match!')
    } else if (password.length < 6) {
        alert('Password must be 6 characters or longer!')
    } else {
        const clientData = {
            firstName,
            lastName,
            userName,
            email,
            password
        }

        await fetch('/client', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${parseCookies(document.cookie).Authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        }).catch((e) => {
            console.log('Error POST to /client:', e)
        })

        document.getElementById('create-client-form').reset()

        clientsSidebar.innerHTML = ''
        fetchClients()
        closeAddClientForm()
    }
})

fetchClients()