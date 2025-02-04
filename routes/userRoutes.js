import express from 'express'
import{ deleteProfileController, getAllProfilesController, getUserProfileController, loginController, logoutController, registerController, updateProfileController } from '../controllers/userController.js'
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

//User Routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);
router.put("/profile-update", isAuth, updateProfileController);

//Admin Routes
router.get("/get-allprofiles", isAuth, isAdmin, getAllProfilesController);
router.delete("/delete-profile/:id", isAuth, isAdmin, deleteProfileController);
export default router



