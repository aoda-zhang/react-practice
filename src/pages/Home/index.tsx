import React, { FC, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import storage from "@/shared/utils/storage";
const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = storage.get("access-token");
    if (accessToken) {
      navigate("/map");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <></>;
};
export default memo(Home);
