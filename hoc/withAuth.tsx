import { useGetUser } from "../apollo/actions";
import Redirect from "@/components/Redirect";
import { messages } from "utils/constants";
import Loader from "@/components/Loader";

export default (WrappComponent, role) => props => {
  const { data: { user } = {}, loading, error } = useGetUser();

  if (!loading && (!user || error) && typeof window !== "undefined") {
    return (
      <Redirect to="/login" query={{ message: Object.keys(messages)[0] }} />
    );
  }

  if (user) {
    if (role && !role.includes(user.role)) {
      return (
        <Redirect to="/login" query={{ message: Object.keys(messages)[1] }} />
      );
    }
    return <WrappComponent {...props} />;
  }

  return (
    <div className="spinner-container">
      <Loader variant="large" />;
    </div>
  );
};
