//importing parameter validators
import {
    parameterValidators,
    makeInvalidParametersString
} from '../utils/parameterValidator.js'

//importing common regex expresions
import {
    onlyCharRegex,
    emailIdRegex,
    passwordRegex,
    jwtRegex
} from '../utils/commonRegex.js'

//singup validator
export const signupValidator = async (req, res, next) => {
    try {
        const validParameters = [
            {
                parameter: 'name',
                type: 'string',
                expressionType: 'regex',
                validExpression: onlyCharRegex
            },
            {
                parameter: 'email',
                type: '',
                expressionType: 'regex',
                validExpression: emailIdRegex
            },
            {
                parameter: 'userName',
                type: 'string',
                expressionType: 'typeof',
                validExpression: ''
            },
            {
                parameter: 'password',
                type: '',
                expressionType: 'regex',
                validExpression: passwordRegex
            }
            
    
        ]
    
        const inValidParameters = parameterValidators(validParameters, req.body)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }
    
        next()
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//signIn validator
export const signInValidator = async(req, res, next) => {
    try {
        const validParameters = [
            {
                parameter: 'userName',
                type: 'string',
                expressionType: 'typeof',
                validExpression: ''
            },
            {
                parameter: 'password',
                type: '',
                expressionType: 'regex',
                validExpression: passwordRegex
            }
        ]
    
        const inValidParameters = parameterValidators(validParameters, req.body)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }
    
        next()
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//jwt validator
export const jwtValidator = async(req, res, next) => {
    try {
        const validParameters = [
            {
                parameter: 'token',
                type: '',
                expressionType: 'regex',
                validExpression: jwtRegex
            }
        ]
    
        const inValidParameters = parameterValidators(validParameters, req.params)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }
    
        next()
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

//validator for forgot password controller
export const sendForgotPasswordEmailValidator = async(req, res, next) => {
    try {
        const validParameters = [
            {
                parameter: 'email',
                type: '',
                expressionType: 'regex',
                validExpression: emailIdRegex
            }
        ]
    
        const inValidParameters = parameterValidators(validParameters, req.body)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }
    
        next()
    } catch (error) {
        console.error(error)
        const code =  error.code ? error.code : 500
        return res.status(code).json({
            data : null,
            msg : error.msg ? error.msg :  "Interval Server error"
        })
    }
}

