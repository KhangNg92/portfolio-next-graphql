export const portFolioTypes = `
type Portfolio {
    _id: ID,
    title: String,
    company: String,
    companyWebsite: String,
    location: String,
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
  }

  input PortfolioInput{
    title: String,
    company: String,
    companyWebsite: String,
    location: String,
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
  }
`;

// ! means that input cannot be null
export const userTypes = `
  type User {
    _id: ID
    avatar: String
    userName: String
    email: String
    role: String
  }
  input SignUpInput {
    avatar: String
    userName: String!
    email: String!
    password: String!
    passwordConfirmation: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
`;
