import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";

enum Role {
  GUEST = "guest",
  ADMIN = "admin",
  INSTRUCTOR = "instructor"
}

@pre<User>("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
})
class User {
  @prop()
  avatar: string;
  @prop({
    required: "Email is required",
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  })
  email: string;
  @prop({ minLength: [6, "Minimun name's length is 6 characters"] })
  name?: string;
  @prop({
    required: true,
    minLength: [6, "Minimun username length is 6 characters"]
  })
  userName: string;
  @prop({
    required: true,
    minLength: [6, "Minimun password length is 6 characters"],
    maxLength: [6, "Maximum password length is 32 characters"]
  })
  password: string;
  @prop({ required: true, default: "guest", enum: Role })
  role: Role;
  @prop()
  info: String;
  @prop({ default: Date.now })
  createdAt?: Date;

  public validatePassword(candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, function(err, success) {
      if (err) return done(err);
      return done(null, success);
    });
  }
}

export const UserModel = getModelForClass(User);
// export type UserModelType = ReturnModelType<AnyParamConstructor<User>>;
