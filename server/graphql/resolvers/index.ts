import { PortfolioModel } from "../../models/portfolio";
import { User } from "../models/User";

// Function from User Class
// const { signUp, signIn, signOut } = User.prototype;

const writeRights = ["instructor", "admin"];

export const portfolioQueries = {
  // Get 1 portfolio
  portfolio: (root, { id }) => {
    return PortfolioModel.findById({ _id: id });
  },

  // get a list of portfolio
  portfolios: () => {
    return PortfolioModel.find();
  },
  userPortfolios: (root, args, { getUser }) => {
    return PortfolioModel.find({ user: getUser()._id }).sort({
      startDate: "desc"
    });
  }
};

export const portfolioMutations = {
  createPortfolio: (root, { input }, { getUser }) => {
    if (!getUser() || !writeRights.includes(getUser().role)) {
      throw new Error("Not Authorized!");
    }
    input.user = getUser();
    return PortfolioModel.create(input);
  },

  updatePortfolio: async (root, { id, input }) => {
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { _id: id },
      input,
      { new: true, runValidators: true }
    );
    return updatedPortfolio;
  },

  deletePortfolio: async (root, { id }) => {
    const { _id } = await PortfolioModel.findOneAndRemove({ _id: id });
    return _id;
  }
};

// USER

const { signUp, signIn, signOut, getAuthUser } = User.prototype;

export const userQueries = {
  // Get 1 portfolio
  user: (root, { id }, ctx) => {
    return getAuthUser(ctx);
  }
};

export const userMutations = {
  signIn: (root, { input }, ctx) => {
    return signIn(input, ctx);
  },
  signUp: async (root, { input }) => {
    const { _id } = await signUp(input);
    return _id;
  },
  signout: (root, args, ctx) => {
    return signOut(ctx);
  }
};

/* ¸
GRAPHQL query example

+ QUERY PORTFOLIOS
  query Portfolios{
     portfolios {
         _id,
         title,
         company,
         companyWebsite
         location
         jobTitle
         description
     }

    portfolio(id:"sad87da79") {
         _id,
         title,
         company,
         companyWebsite
         location
         jobTitle
         description
     }
   }

+ Mutations
   mutation CreatePortfolio {
  createPortfolio(input: {
      title: "Software Eng",
      company: "Google",
      companyWebsite: "www.google.com",
      location: "Fenton, MO",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016"
  }) {
    _id
    title
    description
  }
}
*/
