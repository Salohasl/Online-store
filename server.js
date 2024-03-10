const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config()

// для парсинга json
app.use(express.json());
// для парсинга x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//Путь к папке с картинками
app.use("/static", express.static(__dirname + "/assetc"))

app.use('/api/img', require('./db/img'))


mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

/*
// Подключение к MongoDB
mongoose.connect('mongodb://localhost/catalog', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы для каталога товаров
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', ProductSchema);

app.get('/', async (req, res) => {
    try {
        // Получение списка товаров из каталога
        const products = await Product.find({});

        // Отправка списка товаров на страницу
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка при загрузке каталога товаров');
    }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

*/