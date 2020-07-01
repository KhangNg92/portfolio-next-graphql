import { gql } from "apollo-boost";
import { portfoFields } from "utils/constants";

export const GET_PORTFOLIO = gql`
query Portfolio($id: ID) {
    portfolio(id: $id){
        ${portfoFields}
    }
}
`;
export const GET_PORTFOLIOS = gql`
 { 
   portfolios {
     _id,
     ${portfoFields}
   }
 }

`;

export const CREATE_PORTFOLIO = gql`
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
    ${portfoFields}
  }
 }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(id: $id, input: { title: "Updated Software Eng 1" }) {
      _id
      title
      description
      location
    }
  }
`;

export const DELETE_PORTFO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

/* AUTH QUERIES STARTS ------ */

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $userName: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        userName: $userName
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

/* AUTH QUERIES END ------ */
