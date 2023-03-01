//importing the user model
import UserModel from '../models/user.js'

//repository to fetch the user
export const getUsers = async () => {
    try {
        const usersFound = await UserModel.find().select('_id name userName email emailVerified')
        return {
            code : 200,
            data : usersFound,
            msg : "Users found successfully"
        }
    } catch (error) {
        console.log(`Error in fetching the users`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the users"
        }
    }
}

//repostitory to fetch the single user
export const getUser = async(userName) => {
    try {
        const userFound = await UserModel.findOne({userName : userName}).select('_id name userName email emailVerified')
        return {
            code : 200,
            data : userFound,
            msg : "User found successfully"
        }
    } catch (error) {
        console.log(`Error in fetching the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the user"
        }
    }
}

//repository to save the new user
export const addUser = async(name, userName, email, password) => {
    try {
        const newUser = UserModel({
            name: name,
            userName : userName,
            password : password,
            email : email
        })

        await newUser.save()
        return {
            code : 201,
            data : null,
            msg : "User saved successfully"
        }
    } catch (error) {
        console.log(`Error in adding the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in adding the user"
        }
    }
}

//repository to check if user exists or not
export const checkIfUserExistByUsername = async(userName) => {
    try {
        
        const userFound = await UserModel.findOne({userName: userName})
        return {
            code : userFound ? 400 : 200,
            data : userFound ,
            msg : `${userFound ? `Username exists already`: `Cant find the user`}`
        }
    } catch (error) {
        console.log(`Error in fetching the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the user"
        }
    }
}

//repository to check if user exists with mail or not
export const checkIfUserExistByEmail = async(email) => {
    try {
        const userFound = await UserModel.findOne({email : email})
        return {
            code : userFound ? 400 : 200,
            data : userFound ,
            msg : `${userFound ? `Username exists already`: `Cant find the user`}`
        }
    } catch (error) {
        console.log(`Error in fetching the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the user"
        }
    }
}



//repository to update the user credentials
export const updateUser = async(userName, updateBody) => {
    try {
        const userUpdate = await UserModel.findOneAndUpdate({userName: userName}, updateBody, {new: true})
        return {
            code : 200,
            data : userUpdate,
            msg : "User updated successfully"
        }
    } catch (error) {
        console.log(`Error in updating the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in updating the user"
        }
    }
}

//repository to delete the user
export const deleteUser = async(userName) => {
    try {
        const deleteUser = await UserModel.findOneAndDelete({userName: userName})
        return {
            code : 200,
            data : null,
            msg : "User is deleted successfully"
        }
    } catch (error) {
        console.log(`Error in deleting the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in deleting the user"
        }
    }
}

