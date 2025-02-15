import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useState } from "react";

const CaptainProtectedWrapper = ({ children }) => {
  const {  setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/captain-login");
    }


      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          
          navigate("/captain-login");
        });
    
  }, [token, navigate]);

  if (isLoading) {
    return <di>Loading...</di>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;


