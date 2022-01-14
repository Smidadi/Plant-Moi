
module.exports.verifyInformation = (information) => {
    let res = '';
    if(information.password !== information.CPassword)
        res += 'Les mots de passe ne sont identique !';
    
    let emailVerify = (information.email).split('@');
    
    if(emailVerify[0] == '' && ((emailVerify[1]).split('.'))[0] == '' )
        res += 'L\'email n\'est pas valide';
    
    return res;
}


