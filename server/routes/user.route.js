import express from 'express'
import { getOtherUsers, getProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
const router=express.Router()

router.post("/login",login);
router.post("/register",register);
router.get("/get-profile",isAuthenticated,getProfile);
router.post("/logout",isAuthenticated,logout);
router.get("/get-other-users",isAuthenticated,getOtherUsers);
router.put("/update-profile", isAuthenticated, upload.single('avatar'), updateProfile);

export default router;