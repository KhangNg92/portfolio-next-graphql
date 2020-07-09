import React from "react";
import { formatDate } from "utils/constants";

const PortfolioCard = ({
  portolio: { title, jobTitle, description, startDate, endDate }
}) => {
  return (
    <div className="card subtle-shadow no-border card-container">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{jobTitle}</h6>
        <p className="card-text fs-2 ">{description}</p>
      </div>
      <div className="card-footer no-border">
        <small className="text-muted">
          {formatDate(startDate)} - {endDate ? formatDate(endDate) : "Present"}
        </small>
      </div>
    </div>
  );
};

export default PortfolioCard;
