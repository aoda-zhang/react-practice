import { Drawer } from "antd";
import React, { FC, memo } from "react";

import envConfig from "@/config";

import mapStore from "../../store";

import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const Info: FC<Props> = props => {
  const { formData, currentDate } = mapStore();
  const { isOpen, onClose } = props;
  const getCurrentmapdhospital = () => {
    return formData?.map(item => item?.to) ?? [];
  };
  const getCurrentTotalMileage = () => {
    return formData?.reduce((pre, item) => {
      const value = parseFloat(String(item?.allMileage));
      if (!isNaN(value)) {
        pre += value;
      }
      return Math.round(pre);
    }, 0);
  };
  return (
    <Drawer
      title="本次报销详情"
      placement="bottom"
      closable={true}
      onClose={onClose}
      open={isOpen}
      key="bottom"
      className={styles.info}
    >
      <div>
        <p className={styles.title}>报销日期</p>
        <p className={styles.values}>{currentDate}</p>
      </div>

      <div>
        <p className={styles.title}>报销医院</p>
        <p className={styles.values}>
          {getCurrentmapdhospital()?.map((item, i) => (
            <span key={i} className={styles.val}>
              {item}
            </span>
          ))}
        </p>
      </div>

      <div>
        <p className={styles.title}>报销总里程</p>
        <p className={styles.values}>{getCurrentTotalMileage()}</p>
      </div>

      <div>
        <p className={styles.title}>预估报销总油费</p>
        <p className={styles.values}>
          {(
            getCurrentTotalMileage() * Number(envConfig?.map?.oilPrice)
          ).toFixed(2)}
        </p>
      </div>
    </Drawer>
  );
};
export default memo(Info);
