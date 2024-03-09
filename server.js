const express = require('express');
const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/catalog', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// Создаем схему и модель данных для коллекции в MongoDB
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Data = mongoose.model('Data', dataSchema);

// Маршрут для загрузки данных на страницу
app.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка');
    }
});

// Слушаем порт
app.listen(3000, () => {
    console.log('Сервер запущен на порте 3000');
});