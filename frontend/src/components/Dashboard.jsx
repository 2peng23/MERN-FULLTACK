import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return <div>Hello {user && user.name}</div>;
};

export default Dashboard;
