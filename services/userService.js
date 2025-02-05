import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const registerUser = async (userData) => {
    let { name, email, password, address, city, country, phone, role } = userData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
    const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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

export const getUserProfile = async (userId) => {
    const user = await userModel.findById(userId).select("password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const updateUserProfile = async (userId, updateData) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    Object.assign(user, updateData);
    await user.save();

    return user;
};

export const getAllProfiles = async () => {
    try {
        const users = await userModel.find({});
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProfile = async (userId) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

                                                                                                                                                                                                                                                