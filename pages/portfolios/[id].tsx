import React from "react";
import axios from "axios";
import { useQuery } from "@apollo/react-hooks";
import { GET_PORTFOLIO } from "apollo/queries";

const PortfolioDetail = ({ id }) => {
  const { loading, error, data } = useQuery(GET_PORTFOLIO, {
    variables: { id }
  });

  if (loading) return "Loading....";

  const {
    title,
    jobTitle,
    companyWebsite,
    location,
    startDate,
    endDate,
    description
  } = data.portfolio;

  return (
    <div className="portfolio-detail">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">{title}</h1>
          <p className="lead">{jobTitle}</p>
          <p>
            <a
              className="btn btn-lg btn-success"
              href={companyWebsite}
              role="button"
            >
              See Company
            </a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{location}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">44</p>

            <h4 className="title">End Date</h4>
            <p className="text">{endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioDetail.getInitialProps = async ({ query: { id } }) => {
  return { id };
};

// GET PORTFOLIO FROM NORMAL GRAPHQL
// PortfolioDetail.getInitialProps = async ({ query: { id } }) => {
//   const query = `
//     {
//      portfolio(id: "${id}") {
//        _id,
//        title,
//        company,
//        companyWebsite
//        location
//        jobTitle
//        description
//        startDate
//        endDate
//      }
//    }
//    `;

//   const {
//     data: {
//       data: { portfolio }
//     }
//   } = await axios.post("http://localhost:3000/graphql", { query });

//   return {
//     ...portfolio
//   };
// };

export default PortfolioDetail;
