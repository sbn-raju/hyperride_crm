const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//Configrtations for sending emails
const sendEmailConfig = {
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.VERIFICATION_USER_EMAIL,
    pass: process.env.VERIFICATION_USER_PASSWORD,
  },
};

//Creating the transporter object
const transporter = nodemailer.createTransport(sendEmailConfig);


//Sending the emails to the reciver for verifiactions purposes
const mailSender = async (subject, content) => {
  try {
    const mailDetails = {
        from: process.env.VERIFICATION_USER_EMAIL,
        to: process.env.MASTER_EMAIL,
        subject: subject,
        html: content
    };

    transporter.sendMail(mailDetails, (error, info) => {
      if (error) {
        console.log(error);
        return false
      }
      console.log("Email sent successfully " + info.response);
    });
    
    return true

  } catch (error) {
    console.log(error);
  }
};



//This mail sender is to send the mails which have the HTML text.
const mailSenderHtml = async (email, subject, htmlContent) => {

  if(!email){
      return false
  }

try {
  const mailDetails = {
    from: process.env.VERIFICATION_USER_EMAIL,
    to: process.env.MASTER_EMAIL,
    subject: subject,
    html: htmlContent
  };

  transporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      console.log(error);
      return false
    }
    console.log("Email sent successfully " + info.response);
  });
  
  return true

} catch (error) {
  console.log(error);
}
};



module.exports = {
  mailSender,
  mailSenderHtml
}
