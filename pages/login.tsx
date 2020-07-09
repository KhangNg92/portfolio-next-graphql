import LoginForm from "@/components/LoginForm";
import { userSignIn } from "apollo/actions";
import { useRouter } from "next/dist/client/router";
import BaseLayout from "../layout/BaseLayout";
import withApollo from "../hoc/withApollo";
import { messages } from "utils/constants";

const Login = () => {
  const router = useRouter();
  const [signIn, { data, loading, error }] = userSignIn(router);
  const { message } = router.query;
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
            <h1 className="page-title">Login</h1>
            {message && (
              <div
                className={`alert alert-${messages[message as string].status}`}
              >
                {messages[message as string].value}
              </div>
            )}
            <LoginForm
              loading={loading}
              onSubmit={data => signIn({ variables: data })}
            />
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

export default withApollo(Login);
