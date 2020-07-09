import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

// Components
const MyApp = ({
  Component: { name },
  Component,
  pageProps,
  pageProps: { appData }
}) => {
  return <Component {...pageProps} />;
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
