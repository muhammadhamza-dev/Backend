import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: { 
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    // phone: {
    //     type: String
    // },
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zipCode: String,
    //     country: String,
    // },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    //add image with type string
    image: {
        type: String,
    }
});

let user = mongoose.model("user", userSchema);
export default user;
