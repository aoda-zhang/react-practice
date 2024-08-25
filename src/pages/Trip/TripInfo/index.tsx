import { Drawer } from "antd";
import React, { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import mapStore from "../store";

import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const TripInfo: FC<Props> = (props) => {
  const { getCurrentTripInfo, currentDate } = mapStore();
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  return (
    <Drawer
      title={t("map.mapDetails")}
      placement="bottom"
      closable={true}
      onClose={onClose}
      open={isOpen}
      key="bottom"
      className={styles.info}
    >
      <div>
        <p className={styles.title}>{t("map.view_date")}</p>
        <p className={styles.values}>{currentDate}</p>
      </div>

      <div>
        <p className={styles.title}>{t("map.view_hospital")}</p>
        <p className={styles.values}>
          {getCurrentTripInfo()?.allDestinations?.map((item) => (
            <span key={item} className={styles.val}>
              {item}
            </span>
          ))}
        </p>
      </div>

      <div>
        <p className={styles.title}>{t("map.view_totalDistance")}</p>
        <p className={styles.values}>{getCurrentTripInfo()?.totalMilage}</p>
      </div>

      <div>
        <p className={styles.title}>{t("map.view_totalOil")}</p>
        <p className={styles.values}>{getCurrentTripInfo()?.totalOil}</p>
      </div>
    </Drawer>
  );
};
export default memo(TripInfo);
