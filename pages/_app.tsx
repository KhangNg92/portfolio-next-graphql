import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "next/app";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const MyApp = ({
  Component: { name },
  Component,
  pageProps,
  pageProps: { appData }
}) => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div className="portfolio-app">
        <Navbar />

        {name === "Home" && <Hero />}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
};

/* 
When we call page props here it won't display the initialProps inside children component
*/

// MyApp.getInitialProps = async context => {
//   /*
//   in order to display props from component we have to do this extra steps
//   */
//   // const { pageProps } =
//   //   App.getInitialProps && (await App.getInitialProps(context));
//   // return { pageProps: { appData: "Hello _App Component", ...pageProps } };
// };

export default MyApp;
