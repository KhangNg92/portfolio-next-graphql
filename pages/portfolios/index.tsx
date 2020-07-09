import PortfolioCard from "@/components/PortfolioCard";
import Link from "next/link";
import axios from "axios";

// Actions
import { useQuery } from "@apollo/react-hooks";
import { GET_PORTFOLIOS } from "apollo/queries";
import {
  deletePortfoAction,
  updatePortfoAction,
  createPortfoAction,
  useGetPortfolios
} from "apollo/actions";
import BaseLayout from "../../layout/BaseLayout";
import withApollo from "../../hoc/withApollo";

const Porfolios = () => {
  const { data } = useGetPortfolios();
  const portfolios = (data && data.portfolios) || [];

  // if (loading) return <div>"Loading...."</div>;

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
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
              <div className="action-button-container"></div>
            </div>
          ))}
        </div>
      </section>
    </BaseLayout>
  );
};

// Porfolios.getInitialProps = async () => {
//   // return fetchPortfolios();
// };

export default withApollo(Porfolios);
