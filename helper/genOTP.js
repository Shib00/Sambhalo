function getRandom(){
    return Math.floor(100000 + Math.random() * 900000);
}

function getOTP(data){
    let secretToken = getRandom();
    let active = false;
    data.secretToken = String(secretToken);
    data.active = active;
    return data
}

module.exports = getOTP;