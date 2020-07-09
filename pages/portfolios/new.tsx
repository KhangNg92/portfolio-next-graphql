import React, { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import PortfolioForm from "../../components/PortfolioForm";

// Actions
import {
  createPortfoAction,
  getUserPortfolio,
  updatePortfoAction
} from "../../apollo/actions";
import { useRouter } from "next/router";

// HOC
import BaseLayout from "../../layout/BaseLayout";
import withApollo from "../../hoc/withApollo";
import { toast } from "react-toastify";

const PortfolioNew = () => {
  const router = useRouter();
  const getId = router.query.id;
  const [createPortfolio, { error: errorCreate }] = createPortfoAction(router);
  const [updatePortfo, { error: errorUpdate }] = updatePortfoAction(
    router,
    getId
  );
  // Router

  const error = getId ? errorUpdate : errorCreate;

  const handleActionPortfo = async data => {
    getId && !getId.length
      ? await createPortfolio({ variables: data })
      : await updatePortfo({ variables: { id: getId, ...data } });

    getId && toast.success("Portfolio has been Updated!", { autoClose: 2000 });
  };

  const { data: dataUser } = getUserPortfolio({ variables: { id: getId } });

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4"></div>
        </div>
      </section>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">
              {getId && getId.length ? "Edit" : "Create New"} Portfolio
            </h1>
            {dataUser && getId && (
              <PortfolioForm
                onSubmit={handleActionPortfo}
                mode={getId}
                data={getId ? dataUser.portfolio : {}}
              />
            )}
            {!getId && (
              <PortfolioForm
                onSubmit={handleActionPortfo}
                mode={getId}
                data={getId ? dataUser.portfolio : {}}
              />
            )}
            {error && error.graphQLErrors && (
              <div className="alert alert-danger">
                {error.graphQLErrors[0].message}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioNew, ["admin", "instructor"]));
