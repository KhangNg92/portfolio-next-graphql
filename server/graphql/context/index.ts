import passport from "passport";

const authenticateUser = (req, options) => {
  // options == {email, password}
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) return reject(new Error(error));

      // If we get user here we can save session to DB
      if (user) {
        req.login(user, error => {
          if (error) return reject(new Error(error));
          return resolve(user);
        });
      }

      return reject(new Error("Invalid password or email!"));
    };
    const authFn = passport.authenticate("graphql", options, done);
    authFn();
  });
};

export const buildAuthContext = req => {
  const auth = {
    authenticate: options => authenticateUser(req, options),
    logout: () => {
      return req.logout();
    },
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user
  };
  return auth;
};
