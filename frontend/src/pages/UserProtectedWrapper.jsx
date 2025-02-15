import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (<div>{children}</div>);
};

export default UserProtectedWrapper;
