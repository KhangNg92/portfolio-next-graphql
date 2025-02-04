import { Strategy } from "passport-strategy";

// Strategy get options (email, password) needed to authenticate user
// Strategy gets a callback function that will contain
// Strategy has to have "authenticate" function
// Strategy has access to "error" "fail" "success" functions
export class GraphQLStrategy extends Strategy {
  verify: Function;
  name: String;

  constructor(verify) {
    super();

    if (!verify) {
      throw new Error("GraphQL strategy requires a verify callback");
    }

    this.verify = verify;
    this.name = "graphql";
  }

  authenticate(_, options) {
    const done = (error, user, info) => {
      if (error) return this.error(error);
      if (!user) return this.fail(401);

      return this.success(user, info);
    };
    this.verify(options, done);
  }
}
