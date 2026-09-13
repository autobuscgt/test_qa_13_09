// id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
// year: { type: DataTypes.INTEGER },
// price: { type: DataTypes.DECIMAL },
// image: { type: DataTypes.STRING}
const path = require('path');
const uuid = require('uuid');

const { Cars } = require('../models/models');

class carController {
    async getAll(req, res) {
        try {
            const cars = await Cars.findAll();
            return res.status(200).json({ message: 'Список всех автомобилей', cars })
        } catch (error) {
            return res.status(500).json({ message: 'Не найдено' })
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const candidate = await Cars.findByPk(id);
            if (!candidate) {
                return res.status(404).json({ message: 'Не найдено' })
            }
            return res.status(200).json({ message: 'Найден автомобиль', candidate })
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ message: 'Не найдено' })
        }
    }
    async create(req, res) {
        try {
            const { year, price } = req.body;
            const { image } = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName));

            await Cars.create({ year, price, image: fileName })
            return res.status(500).json({ message: 'Ошибка сервера' });
        } catch (error) {
            console.log(error);
            
            return res.status(200).json({ message: 'Успешно добавлено' })
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const candidate = await Cars.findByPk(id);
            if (!candidate) {
                return res.status(404).json({ message: 'Не найдено' })
            }
            await candidate.destroy();
            return res.status(200).json({message:'Успешно удалено'})
        } catch (error) {
            return res.status(200).json({ message: 'Успешно удалено' })
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { year, price } = req.body;
            const { image } = req.files;

            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName));

            const candidate = await Cars.findByPk(id);

            if (!candidate) {
                return res.status(404).json({ message: 'Не найдено' })
            }

            candidate.update({ year, price, image: fileName });
            return res.status(401).json({message:'Успешно обновлено'})
        } catch (error) {
            return res.status(200).json({ message: 'Успешно удалено' })
        }
    }
}

module.exports = new carController();