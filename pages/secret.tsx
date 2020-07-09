import withAuth from "hoc/withAuth";
import BaseLayout from "../layout/BaseLayout";
import withApollo from "hoc/withApollo";

const Secret = ({ displayMessage }) => {
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
            <h1 className="page-title">Secret</h1>
            SECRET PAGE, ONLY AUTHENTICATED USERS ALLOWED!
            {displayMessage}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(Secret, ["instructor"]));
