import nodemailer from 'nodemailer'
import  dotenv from 'dotenv'

dotenv.config()

const emailUsername = process.env.EMAIL_USERNAME
const emailPassword = process.env.EMAIL_PASSWORD
const emailPort = process.env.EMAIL_PORT
const emailSmtpServer = process.env.SMTP_SERVER

console.log( "emdilUsername ", emailUsername, " emailPassowrd ", emailPassword, " emailPort ", emailPort, " emailSmtpServer ", emailSmtpServer)


const transporter = nodemailer.createTransport({
    host: `${emailSmtpServer}`,
    port: parseInt(emailPort),
    secure : true,
    auth: {
        user: `${emailUsername}`,
        pass: `${emailPassword}`
    }
});



const sendMail = async ( to ,subject, text ) => {
      let mailOptions = {
        from: `"VidMeetUp Support" ${emailUsername}`,
        to: to,
        subject: subject,
        html: text
      };
      await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          //console.log(data)
          console.log("Email sent successfully");
        }
      });
}



export default sendMail

