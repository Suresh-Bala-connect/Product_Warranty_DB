const mongoose = require('mongoose');
const Product = require('../Model/ProductSchema');

// Add Product  
exports.addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({
            userId: req.body.userId,
            productName: req.body.productName,
            catagory: req.body.catagory,
            typeOfProduct: req.body.typeOfProduct,
            brandName: req.body.brandName,
            modelNumber: req.body.modelNumber,
            serialNumber: req.body.serialNumber,
            purchaseDate: req.body.purchaseDate,
            warrantyMonths: req.body.warrantyMonths,
            warrantyEndDate: req.body.warrantyEndDate,
            billImage: req.file ? req.file.fileName : null,
            shopName: req.body.shopName,
            importantNotes: req.body.importantNotes
        });
        res.status(201).json({
            message: "Product added successfully",
            data: newProduct,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error adding product",
            error: error.message,
            success: false,
        });
    }
}

exports.getProduct = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await Product.find({ userId });
        res.status(201).json({
            message: "Successs",
            data: result,
            success: true
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Not get product",
            error: err.message,
            success: false,
        });

    }
}

exports.deleteItem = async (req, res) => {
    console.log("Hello")
    try {
        // const id = req.params.id
        const { id } = req.params;
        const delProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Delete Successfully",
            data: delProduct
        })

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to Delete',
            err: err.message
        });
    }
}

exports.updateData = async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try {
        const updateResult = await Product.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        res.status(200).json({
            success: true,
            message: "Success",
            data: updateResult
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error adding product",
            error: err.message,
            success: false,
        });

    }
}

