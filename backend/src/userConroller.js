
module.exports.verifyInformation = (information) => {
    let emailVerify = (information.email).split('@');
    
    if(emailVerify[0] == '' && ((emailVerify[1]).split('.'))[0] == '' || information.password !== information.CPassword)
        return false;
    return true;
}


