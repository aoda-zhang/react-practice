import React, { type FC, memo } from "react";
import { Outlet } from "react-router-dom";

import useDoubleClick from "@/shared/hooks/useDoubleClick";
import globalStore from "@/store/globalStore";

import TripInfo from "./TripInfo";
import styles from "./index.module.scss";

const Trip: FC = () => {
  const { tripStatus, setTripStatus } = globalStore();

  useDoubleClick(() => {
    setTripStatus({ isInfoOpen: true });
  });
  return (
    <div className={styles.map}>
      <>
        <TripInfo
          isOpen={tripStatus.isInfoOpen}
          onClose={() => {
            setTripStatus({ isInfoOpen: false });
          }}
        />
        <Outlet />
      </>
    </div>
  );
};
export default memo(Trip);
