import { Link, useLocation } from "react-router-dom";

const UpdatePamessage = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="text-white">
      <h1>Password Updated Successfully</h1>
      {email && <p>Reset completed for: {email}</p>}
      <p>You can now log in with your new password.</p>
      <Link to={"/login"}>
       <button>Back to login</button>
      </Link>
    </div>
  );
};

export default UpdatePamessage
