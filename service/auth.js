//importing libraries
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

// importing user repository
import {
    addUser,
    checkIfUserExistByEmail,
    checkIfUserExistByUsername,
} from '../repository/user.js'

//importing user profile service 
import {
    updateUserService
} from './user.js'

import sendMail from '../utils/mail.js'

dotenv.config()

const saltRound = parseInt(`${process.env.BCRYPT_SALT_ROUNDS}`)
const jwtSecret = process.env.JWT_SECRET
const backendUrl = process.env.BACKEND_URL
const frontendUrl = process.env.FRONTEND_URL

//service to signup the user
export const signupUserService = (name, userName ,email, password) => {
    return new Promise(async (resolve, reject) => {

        //checking if user exists or not
        const userPresent = await checkIfUserExistByUsername(userName);
        const userPresentWithEmail = await checkIfUserExistByEmail(email);
        
        // if present cant signup will throw error
        if(userPresent.data !== null || userPresentWithEmail.data !== null){
          
           return  reject({
                code : userPresent.code,
                data : null,
                msg : userPresent.msg
            })
        }
      
        // if not present signup the user
        try {
            //hashing the password
            const hashedPassword = bcrypt.hashSync(password, saltRound)
        
            const newUser = await addUser(name, userName,email, hashedPassword)
            const token = jwt.sign(
                { userName: userName, email : email }, 
                jwtSecret, 
                {algorithm: "HS256", expiresIn: '2d'}
            )
            await sendMail(email, "Email Verification", 
            `<h3>Dear ${name}</h3>
             <h5>Thanks for creating an account</h5>
             <p>Please verify account by clicking on this link <a href=${`${backendUrl}/user/auth/emailVerification/${token}`}>Click Here To Verify</a></p>
             <h6>Regards,</h6>
             <h6>Vidmeetup Support Team</h6>
            `
            )

            return resolve(newUser)
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : "Problem in saving the password"
            })
        }
    })
}

//service to signIn the user
export const signinUserService = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        //checking if the user exists or not
        const userPresent = await checkIfUserExist(userName);

        if(!userPresent.data) {
            console.log(`User doesn't exist`)
            return reject({
                code : 400,
                data : null,
                msg : userPresent.msg
            })
        }

        // if exists then checking the password
        try {
            const hashedPassword = userPresent.data.password
            const isUserSame = bcrypt.compareSync(password, hashedPassword)
            if(!isUserSame) return reject({
                code : 400,
                data : null,
                msg : `Password is not correct`
            })

            //if password is correct then generating the token
            const {_id, name, userName, email} = userPresent.data
            console.log('userpresent', userPresent)
            const token = jwt.sign(
                {_id : _id,name : name, userName: userName, email : email }, 
                jwtSecret, 
                {algorithm: "HS256", expiresIn: '1h'}
            )

            return resolve({
                code : 200,
                data : {
                    token
                },
                msg : `User is authenticated! Welcome`
            })


        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

//service to verify the user email
export const verifyUserEmailService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = jwt.verify(token, jwtSecret)
            if(!user.userName){
                return reject({
                    code : 400,
                    data : null,
                    msg : "Token Invalid or Expired"
                })
            }

            const updateBody = {
                updateField: 'emailVerified'
            }

            const updatedUser = await updateUserService(user.userName, updateBody)
            return resolve(updatedUser)
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

//service to send forgot Password Email
export const sendForgotPasswordEmailService = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userPresent = await checkIfUserExistByEmail(email);

            if(!userPresent.data) {
                console.log(`User doesn't exist`)
                return reject({
                    code : 400,
                    data : null,
                    msg : userPresent.msg
                })
            }
            const {_id, name, userName} = userPresent
            const token = jwt.sign(
                {_id : _id,name : name, userName: userName, email : email }, 
                jwtSecret, 
                {algorithm: "HS256", expiresIn: '1h'}
            )

            await sendMail(email, "Reset Account Password", 
            `
                <h3>Dear ${name},</h3>
                <p>As Per your request Your Password can be reset by clicking below</p>
                <a href=${`${backendUrl}/user/auth/resetPassword/${token}`}>Click Here To Reset</a>
                <h6>Regards,</h6>
                <h6>Vidmeetup Support Team</h6>
            `)

            return resolve({
                code : 200,
                data : null,
                msg : `Reset password email sent successfully`
            })

        } catch (error) {
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

//service to redirect to reset password page
export const verifyResetPasswordService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = jwt.verify(token, jwtSecret)
            if(!user.userName){
                return reject({
                    code : 400,
                    data : null,
                    msg : "Token Invalid or Expired"
                })
            }

            return  resolve({
                code : 200,
                data : `${frontendUrl}/auth/user/resetPasswordPage?username=${user.userName}`,
                msg : `Reset password email sent successfully`
            })
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

