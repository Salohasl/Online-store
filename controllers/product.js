const Product = require('../modles/product');

/**
 * Получить все самолеты
 * @param {*} req 
 * @param {*} res 
 */

const getProduct = async (req, res) =>{
    try{
        const product = await Product.find();

        res.status(200).json(product);
    } catch (error){
        res
            .status(500)
            .json({
                message: 'Не удалось подключить к БД'
            })
    }
}

const getProducts = async (req, res) =>{
    try{
        const product = await Product.find({ _id: req.params.id});

        res.status(200).json(product)
    } catch (error){
        res
            .status(400)
            .json({
                message: 'Самолет не найден'
            })
    }
}

/**
 * Создать самолет
 * @param {*} req 
 * @param {*} res 
 */
const createProduct = async (req, res) => {
    const errors = {};
    if(!req.body.name){
        errors.name = {message: "Пожалуйста, укажите название"}
    }
    if(!req.body.price){
        errors.name = {message: "Пожалуйста, укажите цену"}
    }
    if(!req.body.description){
        errors.name = {message: "Пожалуйста, укажите описание"}
    }
    if(!req.file){
        errors.img = {message: "Пожалуйста, добавьте фото самолета"}
    }

    if(Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    try{
        const { category, name, price, description, pilot } = req.body;

        const product = await Product.create({
            category,
            name, 
            price, 
            pilot,
            description,
            img: `http://localhost:${process.env.PORT}/static/${req.file.filename}`
        })
        req.status(201).json(product)
    } catch (error){
        res
        .status(500)
        .json({
            message: 'Не удалось создать продукцию'
        })
    }
}

module.exports = {
    getProduct,
    createProduct,
    getProducts
}