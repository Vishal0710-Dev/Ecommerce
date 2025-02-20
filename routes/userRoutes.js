import express from 'express'
import{getAllProfilesController, getUserProfileController, loginController, logoutController, registerController, updateProfileController } from '../controllers/userController.js'
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);
router.put("/profile-update", isAuth, updateProfileController);
router.get("/get-allprofiles", isAuth, isAdmin, getAllProfilesController);
export default router



