import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/userService.js';
//import cartService from '../services/cartService.js';
export const registerController = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "Registration successful, please login"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const loginController = async (req, res) => {
//     try {
//         const { email, password} = req.body
//         console.log("line 15")
//         const { user } = await loginUser(email, password)
//         console.log("line 17")
//         const token = generateToken(user._id);
//         res.status(200).json({ success: true, message: "Login successful"
//             });
//     } catch (error) {
//         res.status(500).json({ message: "Error in login API" });
//     }
// };
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);
        if (!user) {
            throw new Error("User not found");
        }
        // const token = generateToken(user._id);
        
        res.status(200).json({ message: "Login successful", token, user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const { user, token } = await loginUser(email, password);

//         if (!user) {
//             throw new Error("User not found");
//         }

     
//         if (!req.session) {
//             req.session = {}; 
//         }

        
//         if (req.session.cartItems && req.session.cartItems.length > 0) {
//             await Promise.all(req.session.cartItems.map(item => 
//                 cartService.addToCart(user._id, item.productId, item.quantity)
//             ));
//             req.session.cartItems = []; 
//         }

//         return res.status(200).json({ 
//             message: "Login successful, cart merged", 
//             token, 
//             user 
//         });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

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
        // const user = await logoutUser
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