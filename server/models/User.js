const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dailyMeals: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
        required: true
    }
}, { minimize: false });

UserSchema.methods.login = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const userModel = mongoose.model('User', UserSchema);
            const user = await userModel.findOne({ username: this.username })
            if (!user) {
                reject({ message: 'User not found' });
                return;
            }
            const passwordMatch = await bcrypt.compare(this.password, user.password);
            if (!passwordMatch) {
                reject({ message: 'Invalid password' });
                return;
            }
            resolve({ user: user, message: 'User logged in successfully' });
        } catch (error) {
            console.log(error);
        }
    })
}

UserSchema.methods.register = function () {
    return new Promise(async (resolve, reject) => {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            await this.save()
            resolve({ message: 'User created successfully' });
        } catch (error) {
            reject(error);
        }
    })
}
UserSchema.methods.addMeal = function (meal) {
    return new Promise(async (resolve, reject) => {
        try {
            const userModel = mongoose.model('User', UserSchema);
            const user = await userModel.findOne({ username: this.username })
            if (!user) {
                reject({ message: 'User not found' });
                return;
            }
            const meals = user.dailyMeals;
            meals.push(meal);
            await user.save();
            resolve({user, sucess: true, message: 'Meal added successfully' });
        } catch (error) {
            reject({ success: false, error });
        }
    })
}

module.exports = mongoose.model('User', UserSchema);