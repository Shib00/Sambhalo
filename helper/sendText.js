const accountSid = 'enter twilio account sid';
const authToken = 'enter twilio account authentication token';
const twilioNum = 'twilio phone no.';
const client = require('twilio')(accountSid, authToken);

function sendText(number,data)
{  
    let mailOptions1 = {
        from: twilioNum,
        to: '+91'+number,
        body: 'Hi, you have a new visitor\n' + 
                'Name: ' + data.name + '\n' + 
                'Email: ' + data.email + '\n' +  
                'Phone: ' + data.contact + '\n' +
                'Checkin Time: ' + data.checkIn + '\n'        
    }

    let mailOptions2 = {
        from: twilioNum,
        to: '+91'+number,
        body: 'Hi, thanks for your visit\n' + 
                'Name: ' + data.name + '\n' +   
                'Phone: ' + data.contact + '\n' +
                'Checkin Time: ' + data.checkIn + '\n' +
                'Checkout Time: ' + data.checkOut + '\n' +
                'Host name: ' + data.hostName + '\n' +
                'Address visited: ' + data.address + '\n'
    }

    let mailOptions = (data.checkOut !== undefined) ? mailOptions2 : mailOptions1;
    client.messages
    .create({
       body: mailOptions.body,
       from: mailOptions.from,
       to: mailOptions.to
     })
    .then(message => console.log(message.sid));
}

module.exports = sendText;
