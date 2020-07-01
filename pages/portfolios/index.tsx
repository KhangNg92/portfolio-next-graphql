import PortfolioCard from "@/components/PortfolioCard";
import Link from "next/link";
import axios from "axios";

// Actions
import { useQuery } from "@apollo/react-hooks";
import { GET_PORTFOLIOS } from "apollo/queries";
import {
  deletePortfoAction,
  updatePortfoAction,
  createPortfoAction
} from "apollo/actions";

const Porfolios = () => {
  const [deletePortfo] = deletePortfoAction();

  const [updatePortfo] = updatePortfoAction();

  const [createPortfolio] = createPortfoAction();

  const { loading, error, data } = useQuery(GET_PORTFOLIOS);

  if (loading) return "Loading....";

  const { portfolios } = data;

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={() => createPortfolio()} className="btn btn-primary">
          Create Porfolio
        </button>
        <hr />
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map(portfolio => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portolio={portfolio} />
                </a>
              </Link>

              <br />
              <div className="action-button-container">
                <button
                  className="btn btn-outline-success btn-sm button-edit"
                  onClick={() =>
                    updatePortfo({ variables: { id: portfolio._id } })
                  }
                >
                  <img className="edit-icon" src="/edit-pencil.png" alt="" />{" "}
                  Update Portfo
                </button>
                {"       "}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() =>
                    deletePortfo({ variables: { id: portfolio._id } })
                  }
                >
                  <img className="edit-icon" src="/criss-cross.png" alt="" />
                  {"  "}
                  Delete Portfo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// Porfolios.getInitialProps = async () => {
//   // return fetchPortfolios();
// };

export default Porfolios;
