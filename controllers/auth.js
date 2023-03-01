// importing auth services 
import {
    signupUserService,
    signinUserService,
    verifyResetPasswordService,
    verifyUserEmailService,
    sendForgotPasswordEmailService
} from '../service/auth.js'

//controller to signup user
export const SignUpController = async(req, res) => {
    try {
        const {name, userName, email, password} = req.body
        const userCreated = await signupUserService(name, userName, email, password)
        return res.status(userCreated.code).json({
            msg : userCreated.msg,
            data : userCreated.data
        })
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//controller to signin user
export const SignInController = async(req, res) => {
    try {
        const {userName, password} = req.body
        const userSignIn = await signinUserService(userName, password)

        const code =  error.code ? error.code : 500
        return res.status(code).json({
            msg: userSignIn.msg,
            data : userSignIn.data
        })

    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//controller to verify the user email
export const verifyUserEmailController = async(req, res) => {
    try {
        const token = req.params.token
        const updatedUser = await verifyUserEmailService(token)

        return res.status(updatedUser.code).json({
            msg: updatedUser.msg,
            data : updatedUser.data
        })
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//controller to send Password Email
export const sendForgotPasswordEmailController = async (req, res) => {
    try {
        const email = req.body.email
        const updatedUser = await sendForgotPasswordEmailService(email)

        return res.status(updatedUser.code).json({
            msg: updatedUser.msg,
            data: updatedUser.data
        })
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//controller to redirect to reset password page
export const verifyResetPasswordController = async(req, res) => {
    try {
        const token = req.params.token
        const updatedUser = await verifyResetPasswordService(token)

        return res.redirect(updatedUser.data)
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

