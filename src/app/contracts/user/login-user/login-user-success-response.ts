import { Token } from "../../token/token";

export class LoginUserSuccessResponse {
  succeeded: boolean;
  token: Token;
}