import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const mailSender = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      html: message,
      attachments: [{
        filename: "flami-logo.png",
        path: './mail/IdleAnim.gif', // './mail/flami-logo.png'
        cid: 'logo-flami@cid'
      }]
    });
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
