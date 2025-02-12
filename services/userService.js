import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import cartService from '../services/cartService.js'; 
export const registerUser = async (userData) => {
    let { name, email, password, address, city, country, phone, role } = userData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if(!passwordRegex.test(password)) {
        throw new Error("Invalid password format")
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already taken");
    }
    password  = await bcrypt.hash(password, 8);
    console.log(password);
    // Create a new user
    return await userModel.create({
        name, email, password, address, city, country, phone, role
    });
};
//  Hash Password Function
// export const hashPassword = async (password) => {
//     return  bcrypt.hash(password, 8);
// };

// //  Compare Password Function
// export const comparePassword = async (plainPassword, hashedPassword) => {
//     return await bcrypt.compare(plainPassword, hashedPassword);
// };
//  Generate JWT Token Function
 export const generateToken = (userId) =>
     {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
 };
// export const loginUser = async (email, password) => {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//         throw new Error("User email and password not found");
//     }

//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//         throw new Error("Invalid credentials");
//     }

//    // const token = user.generateToken();
//    return { user };
// };

export const getUserProfile = async (userId) => {
    
    const user = await userModel.findById(userId).select("password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const loginUser = async (email, password) => {
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = generateToken(user._id);
    return { user, token };  
};


// export const loginUser = async (email, password, sessionCart) => {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//         throw new Error("User not found");
//     }

//     console.log("User found:", user);

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         throw new Error("Invalid credentials");
//     }
//     const token = generateToken(user._id);

//     if (sessionCart && sessionCart.length > 0) {
//         await cartService.mergeGuestCart(user._id, sessionCart);
//     }

//     return { user, token };  
// };

export const updateUserProfile = async (userId, updateData) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    Object.assign(user, updateData);
    await user.save();

    return user;
};

//export const logoutUser = async w
export const getAllProfiles = async () => {
        const users = await userModel.find({});
        return users;
    
};

export const deleteProfile = async (userId) => {
    
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    
};

                                                                                                                                                                                                                                                