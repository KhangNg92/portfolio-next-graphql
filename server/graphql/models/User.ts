import { UserModel } from "../../models/User";

export class User {
  Model: typeof UserModel;
  constructor(model) {
    this.Model = model;
  }
  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }
    return UserModel.create(signUpData);
  }

  async signIn(signInData, { authenticate }) {
    try {
      return await authenticate(signInData);
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      console.log("BEFORE LOGOUT ========");
      console.log("IS AUTHENTICATED", ctx.isAuthenticated());
      console.log("user", ctx.getUser());
      ctx.logout();
      console.log("AFTER LOGOUT ========");
      console.log("IS AUTHENTICATED", ctx.isAuthenticated());
      console.log("user", ctx.getUser());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
