import { DailyMeal } from "./components/createmeal/DailyMeal";
const api_id = "cb911b97"
const api_key = "5384b409c6f6fed8e73a03eec13b9410"
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
}

const guestLogin = () => (
    fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'guest',
            password: 'guest'
        })
    }).then(res => res.json())
)

// (username,password) => Promise(User)
const login = (username, password) => (
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(res => res.json())
)

const register = (username, password) => (
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
)

const addMeal = (username, breakfast, lunch, dinner, snacks, date) => (
    fetch('/api/addMeal', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            dailyMeal: new DailyMeal(date, breakfast, lunch, dinner, snacks)
        })
    })
        .then(res => res.json())
)

const deleteMeal = (username, date) => (
    fetch('/api/deleteMeal', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            date: date
        })
    })
        .then(res => res.json())
)

const overwriteMeal = (username, breakfast, lunch, dinner, snacks, date) => (
    fetch('/api/overwriteMeal', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            dailyMeal: new DailyMeal(date, breakfast, lunch, dinner, snacks),
            date: date,
        })
    })
        .then(res => res.json())
)

export { Search, Nutrients, guestLogin, login, register, addMeal, deleteMeal, overwriteMeal }