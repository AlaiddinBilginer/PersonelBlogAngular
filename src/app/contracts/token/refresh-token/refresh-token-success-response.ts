import { Token } from "../token";

export class RefreshTokenSuccessResponse {
  succeeded: boolean;
  token: Token;
}