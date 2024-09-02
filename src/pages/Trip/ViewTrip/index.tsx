import { Button } from "antd";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import carIcon from "@/shared/assets/images/car.png";
import globalStore from "@/store/globalStore";

import mapStore from "../store";

import styles from "./index.module.scss";
const ViewMap: FC = () => {
  const { tripFormData } = mapStore();
  const { tripStatus, setTripStatus, setDefaultTrip } = globalStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getSpendTime = (spendTime: number) => {
    const randomNumber = Math.floor(Math.random() * 60);
    const formattedNumber = randomNumber.toString().padStart(2, "0");
    return `${spendTime}:${formattedNumber}`;
  };
  const ViewWiget = () => {
    return tripFormData?.reverse()?.map((item) => (
      <div className={styles.item} key={item.startTime}>
        <div className={styles.time}>
          <span className={styles.left}>
            <span>
              <img className={styles.carIcon} src={carIcon} alt="" />
            </span>
            <span className={styles.text}>{item?.startTime}</span>
          </span>
          <span className={styles.follow}>{t("map.with")}</span>
        </div>
        <div className={styles.destination}>
          <span className={styles.icon}>
            <span className={styles.redC} />
            <span className={styles.borderC} />
            <span className={styles.greenC} />
          </span>
          <span className={styles.name}>
            <span>{item?.from}</span>
            <span>{item?.to}</span>
          </span>
        </div>
        <div className={styles.spendTime}>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.allMileage}</span>
              <span className={styles.unit}>km</span>
            </span>
            <span>{t("map.allMileage")}</span>
          </span>
          <span className={styles.column}>
            <span className={styles.value}>{getSpendTime(item?.spendTime)}</span>
            <span>{t("map.driveTime")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.average}</span>
              <span className={styles.unit}>km/h</span>
            </span>
            <span>{t("map.average")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.maxSpend}</span>
              <span className={styles.unit}>km/h</span>
            </span>
            <span>{t("map.maxSpend")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.expectedOil}</span>
              <span className={styles.unit}>元</span>
            </span>
            <span>{t("map.expectedOil")}</span>
          </span>
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.ViewMap}>
      {tripStatus.isView && (
        <>
          <div className={styles.content} id="ZYR">
            <ViewWiget />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.save}
            onClick={() => {
              setTripStatus({ isView: false, isFillMapDate: true });
              navigate("/trip/edit");
            }}
          >
            {t("map.edit")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.save}
            onClick={() => {
              setTripStatus({ isView: false, isFillMapDate: true });
              setDefaultTrip();
              navigate("/trip/edit");
            }}
          >
            {t("map.create_again")}
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(ViewMap);
