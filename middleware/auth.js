//importing libraries
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

//importing user service
import {
    getUserService
} from '../service/user.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

// middleware to authenticate the user with jwt
export const authenticateUser = async(req, res, next) => {
    try {
        //accessing the headers
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token === null || token === undefined) return res.status(401).json({"msg": "Not authorized request"})

        //verifying with jwt token
        const user = jwt.verify(token,JWT_SECRET )

        if(!user.userName){
            return res.status(403).json({
                msg: "Token expired",
                data : null
            })
        }

        const userName = user.userName
        const fetchedUser = await getUserService(userName)
        req.user = fetchedUser.data

        next()

    } catch (error) {
        console.error(error)
        return res.status(403).json({
            "msg": "Token expired",
            data: null
        })
    }
}