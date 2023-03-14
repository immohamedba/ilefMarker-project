const express = require('express');

// email :
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


const sendEmail = async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ba.mhd778@gmail.com',
        pass: 'nwfemafzhzsyslgl'
      }
    });
  
    // Define the email options
    const mailOptions = {
      from: email,
      to: 'ba.mhd778@gmail.com',
      subject: subject,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `
    };
  
    // Send the email
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
}

module.exports = {
    sendEmail,
}