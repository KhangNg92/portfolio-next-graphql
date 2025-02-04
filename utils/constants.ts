import moment from "moment";

export const messages = {
  NOT_AUTHENTICATED: {
    value: "You need to login to get access",
    status: "danger"
  },
  NOT_AUTHORIZED: {
    value: "You are not authorized to visit this page!",
    status: "danger"
  },
  LOGGED_IN: {
    value: "You have been successfuly registered, you can log in now",
    status: "success"
  }
};
export const data = {
  portfolios: [
    {
      _id: "sad87da79",
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016"
    },
    {
      _id: "da789ad1",
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013"
    },
    {
      _id: "sadcxv9",
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011"
    }
  ]
};

export const portfoFields = `
        title
        daysOfExperience @client
        company
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
`;

export const portfolios = [
  {
    title: "Job in Netcentric",
    company: "Netcentric",
    companyWebsite: "www.google.com",
    location: "Spain, Barcelona",
    jobTitle: "Engineer",
    description: "Doing something, programing....",
    startDate: "2014-01-01",
    endDate: "2016-01-01"
  },
  {
    title: "Job in Siemens",
    company: "Siemens",
    companyWebsite: "www.google.com",
    location: "Slovakia, Kosice",
    jobTitle: "Software Engineer",
    description: "Responsoble for parsing framework for JSON medical data.",
    startDate: "2014-01-01",
    endDate: "2016-01-01"
  },
  {
    title: "Work in USA",
    company: "WhoKnows",
    companyWebsite: "www.google.com",
    location: "USA, Montana",
    jobTitle: "Housekeeping",
    description: "So much responsibility....Overloaaaaaad",
    startDate: "2014-01-01",
    endDate: "2016-01-01"
  }
];

export const formatDate = date => {
  return moment.unix(date / 1000).format("MM/DD/YYYY");
};
