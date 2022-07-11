const api_id = '2aaffc7c'
const api_key = '2ca7df59e0482b12ce395f5c05b9ce2d'
const url = 'https://trackapi.nutritionix.com/v2';
const headers = {
    'x-app-id': api_id,
    'x-app-key': api_key,
}


const Search = async (query) => {
    return fetch(url + '/search/instant' + `?query=${query}`, { headers })
        .then(function (response) {
            return response.json();
        })
}

const Nutrients = async (query) => {
    const head = { ...headers, 'x-remote-user-id': '0', "Content-Type": "application/json", 'Accept': 'application/json' }
    return fetch(url + '/natural/nutrients', { method: 'POST', headers: head, body: JSON.stringify({query: query }) })
        .then(function (response) {
            return response.json();
        })
}

export { Search, Nutrients }
