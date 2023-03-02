//importing parameter validators
import {
    parameterValidators,
    makeInvalidParametersString
} from '../utils/parameterValidator.js'

//importing common regex expresions
import {
    onlyCharRegex,
    emailIdRegex,
    passwordRegex
} from '../utils/commonRegex.js'

// update user validator 
export const updateUserValidator = async(req, res, next) => {
    try {
        let validParameters = [
            {
                parameter: 'updateObject',
                type: 'object',
                expressionType: 'typeof',
                validExpression: ''
            }
        ]
    
        let inValidParameters = parameterValidators(validParameters, req.body)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }

        validParameters= [
            {
                parameter: 'updateField',
                type: '',
                expressionType: 'regex',
                validExpression: onlyCharRegex
            }
        ]

        inValidParameters = parameterValidators(validParameters, req.body.updateObject)
           
        if(inValidParameters.length > 0){
            const inValidParametersString = makeInvalidParametersString(inValidParameters)
            return res.status(400).json({
                "error": `${inValidParametersString}`
            })
        }

        let updateField = req.body.updateObject.updateField

        validParameters = []

        if(updateField == 'password'){
            validParameters= [
                {
                    parameter: 'currentPassword',
                    type: '',
                    expressionType: 'regex',
                    validExpression: passwordRegex
                },
                {
                    parameter: 'newPassword',
                    type: '',
                    expressionType: 'regex',
                    validExpression: passwordRegex
                },
            ]
        }
        else if(updateField == 'userName'){
            validParameters = [
                {
                    parameter: 'newUserName',
                    type: 'string',
                    expressionType: 'typeof',
                    validExpression: ''
                },
            ]
        }
        else if(updateField == 'email'){
            validParameters = [
                {
                    parameter: 'newEmail',
                    type: '',
                    expressionType: 'regex',
                    validExpression: emailIdRegex
                },
            ]
        }
        else if(updateField == 'name'){
            validParameters = [
                {
                    parameter: 'newName',
                    type: '',
                    expressionType: 'regex',
                    validExpression: onlyCharRegex
                },
            ]
        }
        else if(updateField == 'forgotPassword'){
            validParameters = [
                {
                    parameter: 'newPassword',
                    type: '',
                    expressionType: 'regex',
                    validExpression: passwordRegex
                },
            ]
        }

        inValidParameters = parameterValidators(validParameters, req.body.updateObject)
           
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

