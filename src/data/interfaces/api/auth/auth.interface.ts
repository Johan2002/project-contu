export interface IAuth {
  userName: string;
  userPassword: string;
}

export interface IAuthenticatedUser {
  token: string;
}

export interface IPayload {
  userId: string;
  userName: string;
  userEmail: string;
  permissions: Array<string>;
}
