var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.DEBUG_EMAIL,
    pass: process.env.DEBUG_EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.DEBUG_EMAIL,
  to: `${process.env.RECIEVER_1}`,
  subject: process.env.EMAIL_SUBJECT,
  text: '.'
};

const emailSender = async (message) => {

    mailOptions.text = `Message: ${message}`;
    const result = await transporter.sendMail(mailOptions);
    if(result.accepted.length == 4){
        return true;
    }else {
        return false;
    }
} 

module.exports  = emailSender;