const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require("multer");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require('./db');
connectDB();

const PORT = process.env.PORT || 5022;

const userCreate=require('./Controller/SigninController');
const productCreate=require('./Controller/ProductController');
const upload=require('./Controller/UploadMiddleware')
// const sendMail=require('./Controller/SenderMail');
const { sendMailController } = require('./Controller/SenderMail');


// const upload=multer({storage:storage});

app.use('/uploads',express.static('uploads')); // its like cors. Connect to the port of 5022 to 3000
app.post('/addproduct',upload.single('billImage'),productCreate.addProduct);

app.post('/create',userCreate.createUser);
app.get('/users',userCreate.getAllUsers);
app.post('/api/login',userCreate.getUserByEmail);
app.get('/product/:id',productCreate.getProduct)
app.delete('/delete/:id',productCreate.deleteItem)
app.put('/update/:id',productCreate.updateData)
app.post('/sendmail', sendMailController);


app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
