//importing libraries
import express from 'express'

//importing validators
import {
   signInValidator,
   signupValidator,
   jwtValidator,
   sendForgotPasswordEmailValidator
} from '../validators/auth.js'

//importing controllers
import {
   SignInController,
   SignUpController,
   verifyResetPasswordController,
   verifyUserEmailController,
   sendForgotPasswordEmailController
} from '../controllers/auth.js'

const router = express.Router()

// router for user signup
router.post('/signup', signupValidator, SignUpController)

//router for user login
router.post('/signin', signInValidator, SignInController)

//router for verifing user email
router.get('/emailVerification/:token', jwtValidator, verifyUserEmailController)

//router for sending forgot password
router.post('/forgotPassword', sendForgotPasswordEmailValidator, sendForgotPasswordEmailController)

//router for redirecting to forgot password
router.get('/resetPassword/:token', jwtValidator, verifyResetPasswordController)

export default router