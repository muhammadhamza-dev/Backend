import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 }
});

let  Cart = mongoose.model('Cart', cartSchema);
export  default Cart;
