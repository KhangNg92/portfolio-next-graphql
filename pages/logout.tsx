import { useSignOut, useGetUser } from "apollo/actions";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import BaseLayout from "../layout/BaseLayout";
import withApollo from "../hoc/withApollo";
import { GET_USER } from "apollo/queries";
import { useQuery } from "@apollo/react-hooks";

const Logout = ({ apollo }) => {
  const [signOut] = useSignOut();
  const router = useRouter();

  const { client, data } = useGetUser();

  useEffect(() => {
    signOut().then(() => {
      // client.cache.reset().then(() => router.push("/login"));
      // client.resetStore().then(() => router.push("/login"));
      client.resetStore().then(() => {
        console.log(data);
        router.push("/login");
      });
    });

    // signOut().then(() => {
    //   apollo.resetStore().then(data => {

    //     router.push("/login");
    //   });
    // });
  }, []);

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
            <h1 className="page-title">Logout</h1>
            <p>Signing out ...</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Logout);
