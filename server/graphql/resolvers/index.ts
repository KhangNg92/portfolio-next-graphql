import { PortfolioModel } from "../../models/portfolio";
import { User } from "../models/User";

// Function from User Class
// const { signUp, signIn, signOut } = User.prototype;

export const portfolioQueries = {
  // Get 1 portfolio
  portfolio: (root, { id }) => {
    return PortfolioModel.findById({ _id: id });
  },

  // get a list of portfolio
  portfolios: (root, args) => {
    return PortfolioModel.find();
  }
};

export const portfolioMutations = {
  createPortfolio: async (root, { input }) => {
    const createdPortfo = await PortfolioModel.create(input);
    return createdPortfo;
  },

  updatePortfolio: async (root, { id, input }) => {
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { _id: id },
      input,
      { new: true }
    );
    return updatedPortfolio;
  },

  deletePortfolio: async (root, { id }) => {
    const { _id } = await PortfolioModel.findOneAndRemove({ _id: id });
    return _id;
  }
};

const { signUp, signIn, signOut } = User.prototype;

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
