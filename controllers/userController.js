import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/userService.js';
export const registerController = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "Registration successful, please login"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);
        if (!user) {
            throw new Error("User not found");
        }
        
        res.status(200).json({ message: "Login successful", token, user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getUserProfileController = async (req, res) => {
    try {
        const user = await getUserProfile(req.user._id);
        res.status(200).json({ message: "All users fetched successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error in getprofile API" });
    }
};

export const updateProfileController = async (req, res) => {
    try {
        const user = await updateUserProfile(req.user._id, req.body);
        res.status(200).json({ success: true, message: "Profile updated"});
    } catch (error) {
        res.status(500).json({ message:"Error in update profile API" });
    }
};

export const logoutController = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error in logout API" });
    }
};
export const getAllProfilesController = async (req, res) => {
    try{
        const users = await getAllProfiles();
        res.status(200).json({message: "Profile delete successfully"});
}catch (error) {
    res.status(500).json({ message: "Error in logout API" });
}                                                                                                                    
};
export const deleteProfileController = async (req, res) => {
    try{
        await deleteProfile(req.params.id);
        res.status(200).json({message: "Profile delete successfully"});
}catch (error) {
    res.status(500).json({ message: "Error in logout API" });
}
};