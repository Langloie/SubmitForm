const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//import dotenv
const dotenv = require('dotenv');

//use dotenv to connect config file
dotenv.config({
    path: "./config.env"
});

//authorization to send email for mailGun
const auth = {
    auth: {
        api_key: process.env.api_key,
        domain: process.env.domain
    }
};

//SMTP transporter
const transporter = nodemailer.createTransport(mailGun(auth));

//data to be sent to email
const sendMail = (email, username, handleError) =>{
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: username,
        text: "Submission received."
    };
    
    transporter.sendMail(mailOptions, (err, data)=>{
        //error handling
        if(err){
            handleError(err, null);
        } else{
            handleError(null, data);
        }
    });
}

module.exports = sendMail;