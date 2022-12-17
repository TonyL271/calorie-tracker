const getNutrientAmount = (food, nutrient) => {
    let value = food[nutrient] * food.scale
    return toFixedIfNecessary(value);
}

// if number is a whole number, return it as an integer if it is a decimal, return it as a float with 1 decimal place
const toFixedIfNecessary = (value) => {
    const dp = 1;
    return +parseFloat(value).toFixed(dp);
}

export default function getNutrients(food) {
    const nutrients = {
        calories: (food.nf_calories * food.scale).toFixed(0),
        total_fat: {
            amount: getNutrientAmount(food, 'nf_total_fat'),
            dv: 65,
            dv_percent: ((food.nf_total_fat * food.scale) / 65 * 100).toFixed(0),
            unit: 'g',
        },
        saturated_fat: {
            amount: getNutrientAmount(food, 'nf_saturated_fat'),
            dv: 20,
            dv_percent: ((food.nf_saturated_fat * food.scale) / 20 * 100).toFixed(0),
            unit: 'g',
        },
        trans_fat: {
            amount: +parseFloat(getNutrientAmount(food, 'nf_total_fat') - getNutrientAmount(food, 'nf_saturated_fat')).toFixed(1),
            dv: 0,
            dv_percent: 0,
            unit: 'g',
        },
        cholesterol: {
            amount: getNutrientAmount(food, 'nf_cholesterol'),
            dv: 300,
            dv_percent: ((food.nf_cholesterol * food.scale) / 300 * 100).toFixed(0),
            unit: 'mg',
        },
        sodium: {
            amount: getNutrientAmount(food, 'nf_sodium'),
            dv: 2400,
            dv_percent: ((food.nf_sodium * food.scale) / 2400 * 100).toFixed(0),
            unit: 'mg',
        },
        total_carbohydrate: {
            amount: getNutrientAmount(food, 'nf_total_carbohydrate'),
            dv: 300,
            dv_percent: ((food.nf_total_carbohydrate * food.scale) / 300 * 100).toFixed(0),
            unit: 'g',
        },
        dietary_fiber: {
            amount: getNutrientAmount(food, 'nf_dietary_fiber'),
            dv: 25,
            dv_percent: ((food.nf_dietary_fiber * food.scale) / 25 * 100).toFixed(0),
            unit: 'g',
        },
        total_sugars: {
            amount: getNutrientAmount(food, 'nf_sugars'),
            dv: 50,
            dv_percent: ((food.nf_sugars * food.scale) / 50 * 100).toFixed(0),
            unit: 'g',
        },
        protein: {
            amount: getNutrientAmount(food, 'nf_protein'),
            dv: 50,
            dv_percent: ((food.nf_protein * food.scale) / 50 * 100).toFixed(0),
            unit: 'g',
        },
        microNutrients: {
            vitamin_A: {
                amount: toFixedIfNecessary(food.full_nutrients.find(nutrient => nutrient.attr_id === 320)?.value ),
                dv: 900,
                dv_percent: ((food.full_nutrients.find(nutrient => nutrient.attr_id === 320)?.value * food.scale) / 900 * 100).toFixed(0),
                unit: 'mcg'
            },
            vitamin_C: {
                amount: toFixedIfNecessary(food.full_nutrients.find(nutrient => nutrient.attr_id === 401)?.value * food.scale),
                dv: 90,
                dv_percent: ((food.full_nutrients.find(nutrient => nutrient.attr_id === 401)?.value * food.scale) / 90 * 100).toFixed(0),
                unit: 'mg'
            },
            vitamin_D: {
                amount: toFixedIfNecessary(food.full_nutrients.find(nutrient => nutrient.attr_id === 328)?.value * food.scale),
                dv: 400,
                dv_percent: ((food.full_nutrients.find(nutrient => nutrient.attr_id === 328)?.value * food.scale) / 400 * 100).toFixed(0),
                unit: 'mcg'
            },
            calcium: {
                amount: toFixedIfNecessary(food.full_nutrients.find(nutrient => nutrient.attr_id === 301)?.value * food.scale),
                dv: 1000,
                dv_percent: ((food.full_nutrients.find(nutrient => nutrient.attr_id === 301)?.value * food.scale) / 1000 * 100).toFixed(0),
                unit: 'mg'
            },
            iron: {
                amount: toFixedIfNecessary(food.full_nutrients.find(nutrient => nutrient.attr_id === 303)?.value * food.scale),
                dv: 18,
                dv_percent: ((food.full_nutrients.find(nutrient => nutrient.attr_id === 303)?.value * food.scale) / 18 * 100).toFixed(0),
                unit: 'mg'
            },
        },
    }

    //delete non existant or undetected micro nutrients
    for (const nutrient in nutrients.microNutrients){
        if (!nutrients.microNutrients[nutrient].amount){
            delete nutrients.microNutrients[nutrient]
        }
    }
    
    return nutrients
}

