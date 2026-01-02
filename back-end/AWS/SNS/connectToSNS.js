const AWS = require("aws-sdk");

let sns = null;
async function connectToSNS(){
    if (sns){
        return sns;
    }

    AWS.config.update({ region: "us-east-1" });
    sns = new AWS.SNS();

    return sns;
}


