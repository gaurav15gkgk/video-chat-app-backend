//function to validate the different input parameters
export const parameterValidators = (validParameters , body) => {
    if(validParameters == undefined || body  == undefined){
        console.log("validParameters and body are required")
        return {
            "error": "Parameters are not passed",
            "status" : "false"
        }
    }

    let inValidParameters = []

    validParameters.map(valid => {
        if(body[valid.parameter] === undefined){
            const body = {
                "parameter": valid.parameter,
                "error": `${valid.parameter} is required`
            }
            inValidParameters.push(body)
        }
        else {
            if(valid.expressionType == 'typeof'){
                if(typeof(body[valid.parameter]) != valid.type){
                    const body = {
                        "parameter": valid.parameter,
                        "error": `${valid.parameter} is not valid`
                    }

                    inValidParameters.push(body)
                }
            }
            else {
                if(!valid.validExpression.test(body[valid.parameter])){
                    const body = {
                        "parameter": valid.parameter,
                        "error": `${valid.parameter} is not valid`
                    }

                    inValidParameters.push(body)
                }
            }
        }
    })

    return inValidParameters
}

//function to make string from invalid parameters
export const makeInvalidParametersString = inValidParameters => {
    if(inValidParameters.length == 0){
        return ''
    }

    let inValidParametersString = ''

    inValidParameters.map( ele => {
        inValidParametersString += `${ele.error} ,`
    })
    console.log("invalid string", inValidParametersString)

    return inValidParametersString.slice(0, inValidParametersString.length -2)
}