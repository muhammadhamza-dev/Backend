import user from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const image = req.file && req.file.filename;
    // console.log(firstName, lastName, username, email, password, image);

    const isEmailExisted = await user.findOne({ email: email });
    if (isEmailExisted) {
      return res.status(400).json({ message: "Email is already existed" });
    }

    const userData = user({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      image,
    });

    await userData.save();
    return res
      .status(200)
      .json({ message: "data saved succesfully", success: true, userData });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const getUsers = await user.find();
    return res.status(200).json({ success: true, getUsers });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const getUserId = req.params.id;
    const userData = await user.findById(getUserId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, userData, message: "got user data" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await user.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, updatedUser, message: "updated user data" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     const hash_password = await bcrypt.hash(userData.password, 10);
//     userData.password = hash_password;
//     const existingUser = await user.findOne({ email: userData.email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     const newUser = await user({ ...userData });
//     return res
//       .status(201)
//       .json({ success: true, newUser, message: "user created successfully" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const registerUser=async(req,res)=>{
  try {
    let userdata=req.body
    let isEmailExisted= await user.findOne({email:userdata.email});
    if(isEmailExisted){
      return res.status(400).json({message:"Email already exists"})
    }
    const hashedPassword=await bcrypt.hash(userdata.password,10);
    userdata.password=hashedPassword
    const User=await user.create(userdata);
   return res.json({message:"User created successfully",User});
  
  } catch (error) {
    res.status(500).json(error.message)  
  }
  }

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const User = await user.findOne({ email });

    if (!User) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "jwtSecret", {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//logout api 
export const logoutUser=async(req,res)=>{
  try {
    res.clearCookie("jwt");
    return res.status(200).json({message :"logged out successfully"})
  }catch(error){
return res.status(500).json(error.message)
  }
}
