export const emailIdRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const userNameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/

export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

export const onlyCharRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/

export const mongoObjectIdRegex = /^[a-f\d]{24}$/i

export const onlyNumberRegex = /^[0-9]+$/

export const jwtRegex = /^[\w-]*\.[\w-]*\.[\w-]*$/