import express from 'express'
import passport from 'passport'
import AuthController from '../controller/auth/authController'
import UserController from '../controller/user/userController'
import UserService from '../services/user/userService'
import authMiddleware from '../middleware/authMiddleware'
const router=express.Router()
const authController=new AuthController()
const userController=new UserController(new UserService())

router.post('/signup',userController.SignUp.bind(userController))
router.post('/login',userController.LoginUser.bind(userController))

router.post('/refreshToken',authController.refreshToken)
router.post('/logout',authMiddleware('user'),authController.handleLogOut.bind(authController))
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',
passport.authenticate('google',{session:false,failureRedirect:'http://localhost:5173/login'}),
authController.handleGoogleCallback)

export default router