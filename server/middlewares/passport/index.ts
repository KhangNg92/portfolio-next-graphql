import { GraphQLStrategy } from "./strategy";
import { UserModel } from "../../models/User";
import { Passport } from "passport";

export const initStrategy = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (error, user) => {
      done(error, user);
    });
  });

  passport.use(
    "graphql",
    new GraphQLStrategy(({ email, password }, done) => {
      // 1. Find user in DB and if user exists verify user password
      // If user is verified call "done"

      UserModel.findOne({ email }, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false);

        // TODO: Check user password if its matching password from option
        // return done(null, user);

        user.validatePassword(password, (err, isMatch) => {
          if (err) return err;
          if (!isMatch) return done(null, false);

          return done(null, user);
        });
      });
    })
  );
};
