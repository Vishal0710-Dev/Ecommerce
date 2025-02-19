import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already taken");
    }
    password  = await bcrypt.hash(password, 8);
    console.log(password);
    return await userModel.create({
        name, email, password, address, city, country, phone, role
    });
};
 export const generateToken = (userId) =>
     {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
 };
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

                                                                                                                                                                                                                                                