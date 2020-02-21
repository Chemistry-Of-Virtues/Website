let clients = []

const parseCookies = x => x
    .split(';')
    .map(e => e.trim().split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

console.log(parseCookies(document.cookie).Authorization)

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
    console.log(clients)
}

fetchClients()