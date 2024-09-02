import { HistoryOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { type FC, memo } from "react";

import styles from "./index.module.scss";
type Props = {
  isDrawerOpen: boolean;
  setDrawerOpen: (drawerStatus: boolean) => void;
};
const DrawerMenuList = [
  {
    ele: <HistoryOutlined />,
    label: "History",
  },
];
const LeftMenu: FC<Props> = ({ isDrawerOpen = false, setDrawerOpen }) => {
  return (
    <Drawer
      placement="left"
      width={250}
      closeIcon={<MenuFoldOutlined className={styles.icon} />}
      mask={false}
      open={isDrawerOpen}
      onClose={() => {
        setDrawerOpen(false);
      }}
    >
      <div className={styles.drawerMenuBox}>
        {DrawerMenuList?.map((item) => (
          <div key={item?.label} className={styles.drawerMenuItem}>
            {item?.ele}
            {item?.label}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default memo(LeftMenu);
