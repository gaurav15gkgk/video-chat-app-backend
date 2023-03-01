//importing user services
import {
    getUsersService,
    updateUserService,
    deleteUserService
} from '../service/user.js'

//controller to get user 
export const getUserController = async(req, res) => {
    try {
        return res.status(200).json({
            msg: 'User fetched successfully',
            data: req.user
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

// controller to get all users
export const getUsersController = async(req, res) => {
    try {
        const allUsers = await getUsersService()
        return res.status(allUsers.code).json({
            data : allUsers.data,
            msg : allUsers.msg
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

//controller to update user
export const updateUserController = async(req, res) => {
    try {
        const userName = req.user.userName
        const updateObject = req.body.updateObject

        const updatedUser = await updateUserService(userName, updateObject)
        return res.status(updatedUser.code).json({
            msg: updatedUser.msq,
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

//controller to delete user
export const deleteUserController = async(req, res) => {
    try {
        const userName = req.user.userName
        const deletedUser = await deleteUserService(userName)

        return res.status(deletedUser.code).json({
            data : deletedUser.data,
            msg: deletedUser.msg
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