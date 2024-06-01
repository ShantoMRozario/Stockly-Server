const nodemailer = require("nodemailer");


const SendEmailUtility = async (EmailTo,EmailSubject,EmailText )=>{
    
    //Create transporter useing SMTP
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'shantorozariom@gmail.com', //From where email will be sent
            pass:'wujo pvkd dmvg pwnz', //App Password of Email
        }
    });

    // The Email Message 
  let mailOptions = {
    from: '"Stockly" <shantorozariom@gmail.com>', // sender address
    to: EmailTo, // list of receivers
    subject: EmailSubject, // Subject line
    text: EmailText , // plain text body
  };

  //Send Email
  return await transporter.sendMail(mailOptions)
}
module.exports = SendEmailUtility; 