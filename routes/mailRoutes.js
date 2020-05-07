require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();


const transporter = nodemailer.createTransport({
    service: "gmail", 
    port: 465,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    },
});


router.post("/mailer", (req, res) => {
    const { email } = req.body 


    const mailOptions = {
        from: "Angela Miller <angemam@gmail.com>",
        to: `${email}`,
        subject: "Testing Nodemailer Demo",
        text:
        `Hello!
    
        And thank you for signing up for our newsletter.  
        We will not overwhelm you.  
        Once a month is how we do it. 
    
        If we have a killer promotion, you may get two during one month.  
        Because we understand how annoying spam is!
    
        See you again, soon!
    
        Sincerely,
        Icelandic Custom Homes`,
    };

    transporter.sendMail(mailOptions, ( err,response ) => {
        console.log(transporter)
        if(err){
            console.log(err)
            res.status(500)
            .json({ message: "Mailer failed to send email", errors: true })
        } else {
          res.status(200).json({ message: "Email sent" });
        }
    }); 
});

module.exports = router;