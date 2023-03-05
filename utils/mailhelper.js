const nodemailer = require("nodemailer");
const mailsender = async (options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });
  const message = {
    from: '"Dharansh👻" <dharanshneema@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };
  let info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};
module.exports = mailsender;
