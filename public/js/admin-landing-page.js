const clientsOverview = document.getElementById('clients-overview')
const clientForm = document.getElementById('create-client')
let clients = []

const parseCookies = x => x
    .split(';')
    .map(e => e.trim().split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

const addClients = () => {
    clientForm.style.display = 'flex'
}

const closeClientForm = () => {
    clientForm.style.display = 'none'
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
        const clientCard = document.createElement('div')
        const clientName = document.createElement('h3')
        const clientEmail = document.createElement('p')

        clientCard.className = 'client-card'
        clientName.className = 'client-name'
        clientEmail.className = 'client-email'

        clientName.innerHTML = `${client.firstName} ${client.lastName}`
        clientEmail.innerHTML = client.email
        clientCard.appendChild(clientName)
        clientCard.appendChild(clientEmail)
        clientsOverview.appendChild(clientCard)
    })
}

fetchClients()