// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { FC, ReactNode } from "react";
import Footer from "../pages/footer";
import { ToastContainer } from "react-toastify";

type BaseLayoutProps = {
  children: ReactNode;
  page?: string;
};

const BaseLayout: FC<BaseLayoutProps> = ({ children, page }) => {
  return (
    <div className="portfolio-app">
      <Navbar />
      {page === "Home" && <Hero />}
      <div className="container">{children}</div>
      {page === "Home" && <Footer />}
      <ToastContainer />
    </div>
  );
};

/* 
When we call page props here it won't display the initialProps inside children component
*/

// BaseLayout.getInitialProps = async context => {
//   /*
//   in order to display props from component we have to do this extra steps
//   */
//   // const { pageProps } =
//   //   App.getInitialProps && (await App.getInitialProps(context));
//   // return { pageProps: { appData: "Hello _App Component", ...pageProps } };
// };

export default BaseLayout;
