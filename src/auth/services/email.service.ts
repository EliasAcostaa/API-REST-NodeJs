import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

export class EmailService {
  //private transporter: Transporter;

  constructor() {
    /*this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });*/

    
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    console.log("mail ", process.env.EMAIL_USER)
    console.log("pass ", process.env.SENDGRID_API_KEY)
    try {
      console.log("antes de config")

      const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465, // Puerto SMTP de SendGrid
        secure: false, // False para conexiones STARTTLS
        auth: {
          user: "apikey", // Esto debe ser "apikey" para SendGrid
          pass: process.env.SENDGRID_API_KEY, // Tu API Key de SendGrid
        },
      });
      console.log("despues de config")

      let message = {
        from: `"Mi App" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
      };

      // Enviar el mensaje
      transporter.sendMail(message, (err: Error | null, info: SentMessageInfo) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Solo disponible cuando se envía a través de una cuenta de Ethereal
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

    } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw error;
    }
  }
 
  async sendTestEmail() {
    try {
      // Crear una cuenta de prueba en Ethereal
      const account = await nodemailer.createTestAccount();

      console.log('Credentials obtained, sending message...');

      // Crear el objeto de transporte SMTP
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure, // true for 465, false for other ports
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      // Definir el mensaje
      let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
      };

      // Enviar el mensaje
      transporter.sendMail(message, (err: Error | null, info: SentMessageInfo) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Solo disponible cuando se envía a través de una cuenta de Ethereal
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    } catch (err) {
      console.error('Failed to create a testing account. ' + (err as Error).message);
      process.exit(1);
    }
  }
}
