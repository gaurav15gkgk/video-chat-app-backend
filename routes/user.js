//importing libraries
import express from 'express'

//importing validators
import {
   updateUserValidator
} from '../validators/user.js'

//importing controllers
import {
   getUserController,
   getUsersController,
   updateUserController,
   deleteUserController
} from '../controllers/user.js'

//importing middleware
import {
    authenticateUser
} from '../middleware/auth.js'

const router = express.Router()

// router for fetching all the users
router.get('/users', getUsersController)

//router for fetching the single user
router.get('/one', authenticateUser, getUserController)

//router for updating the user
router.put('/update',  updateUserValidator, authenticateUser, updateUserController)

//router for deleting the user
router.delete('/delete', authenticateUser, deleteUserController)


export default router