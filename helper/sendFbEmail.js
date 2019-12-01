const nodemailer  = require("nodemailer");
const senderMail = 'Enter email';
const pass = 'Enter password';
const service = 'gmail';

let transporter = nodemailer.createTransport({
    service: service,
    auth: {
        user: senderMail,
        pass: pass
    }
});

function sendFbEmail(email,data)
{
    let conclusionStr = '\nHave a good day !\n\nNote: This is an auto-generated email. Please do not respond to this email.';
    let mailOptions1 = {
        from: senderMail,
        to: email,
        subject: 'Copy of your feedback',
        text: 'Hi, here is a copy of your feedback\n' + 
                'Name: ' + data.name + '\n' + 
                'Host: ' + data.hostName + '\n' +  
                'Did you get what you were looking for: ' + data.fullFill+ '/5' + '\n' +
                'How was the attitude of host: ' + data.attitudeHost+ '/5' + '\n' +
                'Did you experience any delay in service: ' + data.timing+ '/5' + '\n' +
                'Other Suggestions: ' + data.other + '\n' +
                conclusionStr       
    }

    transporter.sendMail(mailOptions1, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendFbEmail;
