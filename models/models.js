const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    login: {type:DataTypes.STRING},
    name: {type:DataTypes.STRING, allowNull:false, validate:{min:2}},
    password: {type:DataTypes.STRING, allowNull:false, validate:{min:6}},
    salary: {type:DataTypes.DECIMAL, allowNull:false},
    role: {type:DataTypes.ENUM('ADMIN','USER'), defaultValue:'USER'},
})

const Cars = sequelize.define('cars', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL },
    image: { type: DataTypes.STRING}
})

User.hasMany(Cars);
Cars.belongsTo(User);

module.exports = { User, Cars }