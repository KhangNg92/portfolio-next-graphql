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
mutation CreatePortfolio(
  $title: String
  $company: String
      $companyWebsite: String
      $location: String
      $jobTitle: String
      $description: String
      $startDate: String
      $endDate: String
) {
  createPortfolio(input: {
      title: $title
      company: $company
      companyWebsite: $companyWebsite
      location: $location
      jobTitle: $jobTitle
      description: $description
      startDate: $startDate
      endDate: $endDate
  }) {
    _id
    ${portfoFields}
  }
 }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID
    $title: String
    $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate: String
        $endDate: String
    
    ) {
    updatePortfolio(id: $id, input: { 
       title: $title
    company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
    }) {
     ${portfoFields}
    }
  }
`;

export const DELETE_PORTFO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
    }
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

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      userName
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signout
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      userName
      role
    }
  }
`;
/* AUTH QUERIES END ------ */
