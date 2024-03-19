import jwt from "jsonwebtoken";

export class AuthService {
  /**
   * Accepts userId and returns jwt string
   */
  getAuthToken(userId: number): string {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET!);
  }
  /**
   * Accepts jwt token and return json payload
   */
  verifyAuthToken(token: string): jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
  }
}

export default new AuthService();