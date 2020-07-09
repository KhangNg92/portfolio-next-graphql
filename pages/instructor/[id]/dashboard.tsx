import React from "react";

// Actions

import { useRouter } from "next/router";
import BaseLayout from "layout/BaseLayout";
import withApollo from "hoc/withApollo";
import withAuth from "hoc/withAuth";
import { Card, Button } from "react-bootstrap";

import { getDataFromTree } from "@apollo/react-ssr";
import { getUserPortfolios, deletePortfoAction } from "apollo/actions";
import Link from "next/link";
import { formatDate } from "utils/constants";

type UserPortfos = {
  userPortfolios: Array<{
    jobTitle: string;
    title: string;
    startDate: string;
    endDate: string;
  }>;
};
const InstructorDashboard = () => {
  const router = useRouter();

  const [deletePortfo] = deletePortfoAction();

  const { data } = getUserPortfolios();
  const userPortfos = (data && data.userPortfolios) || [];

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Instructor Portfolios</h1>
            {userPortfos.map(({ jobTitle, title, startDate, endDate, _id }) => (
              <Card key={_id} className="mb-2">
                <Card.Header>{jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    {formatDate(startDate)} -{" "}
                    {endDate ? formatDate(endDate) : "Present"}
                  </Card.Text>
                  <Link
                    href={{
                      pathname: "/portfolios/new",
                      query: { mode: "edit", id: _id }
                    }}
                  >
                    <a href="" className="btn btn-warning mr-1">
                      Update
                    </a>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => deletePortfo({ variables: { id: _id } })}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(
  withAuth(InstructorDashboard, ["admin", "instructor"]),
  { getDataFromTree }
);
