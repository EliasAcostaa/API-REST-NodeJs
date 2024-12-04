import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entitites/user.entity";
import { UserService } from "../../user/services/user.service"
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";

export class AuthController extends AuthService {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super();
  }

  async login(req: Request, res: Response) {
    try {
      const userEncode = req.user as UserEntity;

      const encode = await this.generateJWT(userEncode);
      if (!encode) {
        return this.httpResponse.Unauthorized(res, "No tienes permisos");
      }

      res.header("Content-Type", "application/json");
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
      res.write(JSON.stringify(encode));
      res.end();
    } catch (err) {
      console.error(err);
      return this.httpResponse.Error(res, err);
    }
  }

  async recoverAccount(req: Request, res: Response) {
    try {
      const { email } = req.body;

      console.log("email: " + email);
      // Validar si el correo fue proporcionado
      if (!email) {
        return this.httpResponse.NotFound(res, "Email no encontrado");
      }
      console.log("pasa email: " + email);

      // Buscar el usuario por email

      const user = await this.userService.findByEmail(email);
      
      console.log("busca pro email: " + user);
      if (!user) {
        return this.httpResponse.NotFound(res, "Usuario no encontrado");
      }

      // Generar un token único
      const resetToken = Math.floor(100000 + Math.random() * 900000);

      // Enviar correo con el token
      const emailService = new EmailService()
      await emailService.sendMail(
        user.email, // Cambia al correo del destinatario
        "Recuperación de contraseña", // Asunto
        `<p>Hola,</p>
         <p>Este es tu codigo para recuperar tu cuenta, no lo compartas con nadie, nosotros no te lo pediremos</p>
         <h2>${resetToken}</h2>`
      );

      //await emailService.sendTestEmail()

      return this.httpResponse.OK(res, "correo de recuperacion enviado")
    } catch (err) {
      console.error(err);
      return this.httpResponse.Error(res, err);
    }
  }
}
