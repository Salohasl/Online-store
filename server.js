const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello world')
})


mongoose.connect("mongodb://127.0.0.1:27017")
    .then(()=>{
        app.listen(port, () => {
            console.log('its work2')
        })
    })



    /*app.use(express.json());
app.use(express.urlencoded({extended:true}));
//путь к папке с картинками
app.use("/static", express.static(__dirname + "/assets"));


app.use('/api/img', require('./routes/img'))



async function start(){
    try{
        await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, ()=>{
            console.log('Server work')
        })
    }catch(e){
        console.log(e)
    }
}

start()
*/