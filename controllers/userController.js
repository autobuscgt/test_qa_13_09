// const User = sequelize.define('users', {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     login: {type:DataTypes.STRING},
//     name: {type:DataTypes.STRING, allowNull:false, validate:{min:2}},
//     password: {type:DataTypes.STRING, allowNull:false, validate:{min:6}},
//     salary: {type:DataTypes.DECIMAL, allowNull:false},
//     role: {type:DataTypes.ENUM('ADMIN','USER'), defaultValue:'USER'},
// })

const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJWT = ({ login, role }) => {
    return jwt.sign({ login, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class userController {
    async getAll(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json({ message: 'Все пользователи', users })
        } catch (error) {
            console.log(error);
        }
    }
    async getAllWithoutPasswords(req, res) {
        try {
            const users = await User.findAll(
                {attributes: 
                    ['id','login', 'role']
                }
            );
            return res.status(200).json({ message: 'Все пользователи', users })
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const candidate = await User.findOne({ where: { login } })
            if (!candidate) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            }
            const matchPasswords = await bcrypt.compareSync(password, candidate.password);
            if (!matchPasswords) {
                return res.status(401).json({ message: 'Не авторизован' })
            }
            const token = generateJWT({ login: candidate.login, role: candidate.role });
            return res.status(201).json({ message: 'Успешно зарегистрирован', token })
        } catch (error) {
            console.log(error);
        }
    }
    async register(req, res) {
        try {
            const { login, name, password, salary, role } = req.body;
            const candidate = await User.findOne({ where: { login } })
            if (candidate) {
                return res.status(404).json({ message: 'Пользователь уже существует' })
            }
            const hashPassword = await bcrypt.hash(password, 8);
            const newUser = await User.create({ login, name, password: hashPassword, salary, role });
            const token = generateJWT({ login: newUser.login, role: newUser.role });
            return res.status(201).json({ message: 'Успешно зарегистрирован', token })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Ошибка регистрации' })
        }
    }
}

module.exports = new userController();