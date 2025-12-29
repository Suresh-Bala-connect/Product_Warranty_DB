const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signin',  },
    productName: { type: String, required: true, trim: true  },
    catagory: { type: String, required: true, trim: true  },
    typeOfProduct: { type: String, required: true},
    brandName: { type: String, required: true, trim: true  },
    modelNumber: { type: String, trim: true  },
    serialNumber: { type: String, trim: true  },
    purchaseDate: { type: Date, required: true, trim: true  },
    warrantyMonths: { type: Number, required: true, trim: true  },
    warrantyEndDate: { type: Date, required: true, trim: true  },
    billImage: { type: String, },
    shopName: { type: String, required: true, trim: true  },
    importantNotes: { type: String, trim: true  },
    createdAt: { type: Date, default: Date.now }


});

module.exports = mongoose.model('Product', ProductSchema);