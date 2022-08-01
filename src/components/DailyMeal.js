class DailyMeal{
    constructor(date,breakfast,lunch,dinner,snacks){
        this.date = `${date.getFullYear()}/${date.getMonth()}/${this.getDate()}`;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.snacks = snacks;
    }

    getDate(){
        return this.date;
    }

    getBreakfast(){
        return this.breakfast;
    }
    getLunch(){
        return this.Lunch;
    }
    getDinner(){
        return this.dinner;
    }
    getSnacks(){
        return this.snacks;
    }
}

export {DailyMeal};