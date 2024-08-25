import { FormOutlined, MenuFoldOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, { type FC, memo, useEffect, useMemo, useState } from "react";
import {
  type NonIndexRouteObject,
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";

import storageTool from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import StorageKeys from "@/typings/storage.types";

import AvatarMenu from "../AvatarMenu";
import LeftMenu from "../LeftMenu";

import styles from "./index.module.scss";

const Layout: FC = () => {
  const { setTripStatus, userInfo, setDefaultTrip } = globalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMenuAvaliable = useMemo(() => {
    const currentMatch: NonIndexRouteObject = matches.find(
      (match) => match.pathname === location.pathname,
    );
    return currentMatch?.handle?.isMenuAvaliable ?? true;
  }, [location.pathname, matches]);

  const isExistToken = useMemo(() => {
    return storageTool.get(StorageKeys.accessToken);
  }, []);
  useEffect(() => {
    if (!isExistToken) {
      navigate("/login");
    }
  }, [isExistToken, navigate]);
  const Header = () => {
    return (
      <>
        {isMenuAvaliable && (
          <header className={styles.header}>
            <>
              <MenuFoldOutlined
                className={styles.icon}
                onClick={() => {
                  setDrawerOpen(true);
                }}
              />
              <FormOutlined
                className={classNames([styles.icon, styles.edit])}
                onClick={() => {
                  setTripStatus({ isView: false, isFillMapDate: true });
                  setDefaultTrip();
                  navigate("/trip/edit");
                }}
              />
              <LeftMenu isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
              <AvatarMenu userInfo={userInfo} />
            </>
          </header>
        )}
      </>
    );
  };
  return (
    <>
      {isExistToken && (
        <div className={styles.layout}>
          <Header />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
export default memo(Layout);
