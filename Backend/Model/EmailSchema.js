const nodeMailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
    // Create a transporter object using SMTP transport
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    // Set up email data
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;