import RegisterForm from "@/components/RegisterForm";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "apollo/queries";
import { useRouter } from "next/dist/client/router";

const Register = () => {
  const router = useRouter();
  const [register, { data, error }] = useMutation(SIGN_UP, {
    onCompleted() {
      router.push("/login");
    },
    onError() {
      return;
    }
  });

  return (
    <div className="container">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm
              onSubmit={registerData => {
                register({ variables: registerData });
              }}
            />
            {error && error.graphQLErrors[0].message && (
              <div className="alert alert-danger">
                {error.graphQLErrors[0].message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
