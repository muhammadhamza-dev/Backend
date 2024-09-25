import express from 'express';
import { addUser, deleteUser, getUser, getUserById, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.js';
import upload from '../utils/helper.js';

const userRoute = express.Router();

userRoute.post("/adduser" ,upload.single('image'), addUser );
userRoute.get("/getuser", getUser);
userRoute.get("/getuser/:id", getUserById);
userRoute.delete("/deleteuser/:id" , deleteUser)
userRoute.put("/updateuser/:id" ,  updateUser);
userRoute.post("/registeruser" , registerUser);
userRoute.post("/loginuser" ,loginUser);
userRoute.post("/logoutuser" , logoutUser);



export default userRoute