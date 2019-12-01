const nodemailer  = require("nodemailer");
const senderMail = 'Enter email here';
const pass = 'Enter password here';
const service = 'gmail';

let transporter = nodemailer.createTransport({
    service: service,
    auth: {
        user: senderMail,
        pass: pass
    }
});

function sendEmail(email,data,otp)
{
    let conclusionStr = '\nHave a good day !\n\nNote: This is an auto-generated email. Please do not respond to this email.';
    let mailOptions1 = {
        from: senderMail,
        to: email,
        subject: 'You have a visitor',
        text: 'Hi, you have a new visitor\n' + 
                'Name: ' + data.name + '\n' + 
                'Email: ' + data.email + '\n' +  
                'Phone: ' + data.contact + '\n' +
                'Checkin Time: ' + data.checkIn + '\n' +
                conclusionStr       
    }

    let mailOptions2 = {
        from: senderMail,
        to: email,
        subject: 'Meeting Complete',
        text: 'Hi, thanks for your visit\n' + 
                'Name: ' + data.name + '\n' +   
                'Phone: ' + data.contact + '\n' +
                'Checkin Time: ' + data.checkIn + '\n' +
                'Checkout Time: ' + data.checkOut + '\n' +
                'Host name: ' + data.hostName + '\n' +
                'Address visited: ' + data.address + '\n' +
                conclusionStr          
    }

    let mailOptions3 = {
        from: senderMail,
        to: email,
        subject: 'OTP',
        text: 'Hi, here is your OTP\n' + 
                data.secretToken + '\n' +   
                conclusionStr          
    }

    let mailOptions4 = (data.checkOut !== undefined) ? mailOptions2 : mailOptions1;
    let mailOptions = otp === undefined ? mailOptions4: mailOptions3; 

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;
