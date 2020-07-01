import { data } from "../../../utils/constants";
import crypto from "crypto";

const { portfolios } = data;

export const portfolioResolver = {
  hello: () => {
    return "Hello World!";
  },

  // Get 1 portfolio
  portfolio: ({ id }) => {
    const portfolio = portfolios.find(({ _id }) => _id === id);
    return portfolio;
  },

  // get a list of portfolio
  portfolios: () => {
    return portfolios;
  },

  // Create Portfolio

  // Parameters here will be
  createPortfolio: ({ input }) => {
    const cryptoId = crypto.randomBytes(10).toString("hex");
    const newPortfo = { ...input };
    newPortfo._id = cryptoId;
    portfolios.push(newPortfo);
    return newPortfo;
  }
};

/* 
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


   + mutations
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
