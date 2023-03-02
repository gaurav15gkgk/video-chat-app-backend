//importing libraries
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

// importing user repository
import {
    getUser,
    getUsers,
    checkIfUserExistByEmail,
    updateUser,
    deleteUser,
    checkIfUserExistByUsername
} from '../repository/user.js'

import sendMail from '../utils/mail.js'

dotenv.config()

const saltRound = parseInt(`${process.env.BCRYPT_SALT_ROUNDS}`)


//service to fetch the users 
export const getUsersService = () => {
    return new Promise(async (resolve,reject) => {
        try {
            const usersFound = await getUsers();
            return resolve(usersFound)
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

//service to fetch a signle user
export const getUserService = (userName) => {
    return new Promise(async(resolve, reject) => {
        try {
            const userFound = await getUser(userName)
            return resolve(userFound) 
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

//service to update the user
export const updateUserService = (userName, updateObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateField = updateObject.updateField
            let updateBody = {}
            let updateMessage = ''
            if(updateField == 'password'){
                const currentPassword = updateObject.currentPassword
                const newPassword = updateObject.newPassword
                const userPresent = await checkIfUserExistByUsername(userName);
                
                if(!userPresent.data) {
                    console.log(`User doesn't exist`)
                    return reject({
                        code : 400,
                        data : null,
                        msg : userPresent.msg
                    })
                }

                const hashedPassword = userPresent.data.password
                const isUserSame = bcrypt.compareSync(currentPassword, hashedPassword)
                if(!isUserSame) return reject({
                    code : 400,
                    data : null,
                    msg : `Password is not correct`
                })

                const newHashedPassword = bcrypt.hashSync(newPassword, saltRound)
                updateBody.password = newHashedPassword
                updateMessage = 'Password is updated successfully'
            }
            else if(updateField == 'userName'){
                const newUserName = updateObject.newUserName
                const userPresent = await checkIfUserExist(newUserName)
                
                if(userPresent.data) {
                    console.log(`User already exists`)
                    return reject({
                        code : 400,
                        data : null,
                        msg : `UserName already exists! Please find other Username`
                    })
                }

                updateBody.userName = newUserName
                updateMessage = 'Username is updated successfully'
            }
            else if(updateField == 'email'){
                const newEmail = updateObject.newEmail
                const userPresent = await checkIfUserExistByEmail(newEmail)

                if(userPresent.data) {
                    console.log(`User already exists`)
                    return reject({
                        code : 400,
                        data : null,
                        msg : `Email already exists! Please find other Email`
                    })
                }

                updateBody.email = newEmail
                updateMessage = 'Email is updated successfully'
                
            }
            else if(updateField == 'emailVerified'){
                updateBody.emailVerified = true
                updateMessage = 'Email is verified successfully'
            }
            else if(updateField == 'name'){
                const newName = updateObject.newName
                updateBody.name = newName
                updateMessage = 'Name is updated successfully'
            }
            else if(updateField == 'forgotPassword'){
                const newPassword = updateObject.newPassword
                const newHashedPassword = bcrypt.hashSync(newPassword, saltRound)
                updateBody.password = newHashedPassword
                updateMessage = 'Password is updated successfully'
            }
            else {
                return reject({
                    code : 403,
                    data : null,
                    msg : "Invalid Request"
                })
            }

            const updatedUser = await updateUser(userName, updateBody)
            await sendMail(updatedUser.data.email, `User Profile Update Notification`, 
            `<h3>Dear ${updatedUser.data.name}</h3>
            <p>As per your recent request your ${updateMessage}</p>

            <h6>Regards,</h6>
            <h6>Vidmeetup Support Team</h6>
            `)
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

//service to delete the user
export const deleteUserService = (userName) => {
    return new Promise(async(resolve, reject) => {
        try {
            const deletedUser = await deleteUser(userName)
            return resolve(deletedUser)
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


