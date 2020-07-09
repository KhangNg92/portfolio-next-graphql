import { UserModel } from "../../models/User";

export class User {
  Model: typeof UserModel;
  constructor(model) {
    this.Model = model;
  }

  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }
    return null;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }

    try {
      return await UserModel.create(signUpData);
    } catch (error) {
      if (error.code && error.code === 11000) {
        throw new Error("User with provided email already exists!");
      }
      throw error;
    }
  }

  async signIn(signInData, { authenticate }) {
    try {
      const user = await authenticate(signInData);
      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
