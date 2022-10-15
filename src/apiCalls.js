const api_id = '2aaffc7c'
const api_key = '2ca7df59e0482b12ce395f5c05b9ce2d'
const url = 'https://trackapi.nutritionix.com/v2';
const headers = {
    'x-app-id': api_id,
    'x-app-key': api_key,
}


const Search = async (query) => {
    return fetch(url + '/search/instant' + `?query=${query}`, { headers })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log('failed api request search')
            console.log(err)
            return {}
        })
}

const Nutrients = async (query) => {
    const head = { ...headers, 'x-remote-user-id': '0', "Content-Type": "application/json", 'Accept': 'application/json' }
    const nutrients = await fetch(url + '/natural/nutrients', {
        method: 'POST', headers: head, body: JSON.stringify({ query: query })
    })
    const nutrientsJson = await nutrients.json()
    let foodInfo = null;
    if (nutrientsJson.foods.length) {
        foodInfo = nutrientsJson.foods[0];
        let nutrientKeys = Object.entries(foodInfo).filter((entry) => entry[0].substring(0, 2) === "nf");
        nutrientKeys = nutrientKeys.map((entry) => entry[0]);
        nutrientKeys.forEach((key) => {
            foodInfo[key + '_scaled'] = foodInfo[key]
        })
        foodInfo.scale = 1
        foodInfo.qty = 1
    }
    return foodInfo
    // .then(function (response) {
    //     return response.json();
    // })
    // .catch((err) => {
    //     console.log('failed api request nutrients')
    //     console.log(err)
    //     return {}
    // })
}

export { Search, Nutrients }
