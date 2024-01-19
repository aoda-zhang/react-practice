import React, { memo } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import "dayjs/locale/zh-cn";
import styles from "./index.module.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import globalStore from "@/shared/store/globalStore";
import fareStore from "../store";

const BusinessMap: React.FC = () => {
  const { hospitales, setHospital } = globalStore();
  const { setFareStatus, fareStatus } = fareStore();
  const onSelectedHospital = (value: string) => {
    const newHospitalItem = [
      {
        label: value,
        value,
      },
    ];
    setHospital(newHospitalItem);
  };
  return (
    <div className={styles.form}>
      <Form.List name="fareInfo">
        {(fields, { add, remove }) => (
          <>
            {fareStatus?.isEdit &&
              fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 4 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    label="出发时间"
                    name={[name, "startTime"]}
                    rules={[{ required: true, message: "请输入出发时间" }]}
                  >
                    <Input placeholder="示例 16:24" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="出发地点"
                    name={[name, "from"]}
                    rules={[{ required: true, message: "请输入出发地点" }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          ?.toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      size="large"
                      mode="tags"
                      placeholder="请选择出发医院"
                      optionFilterProp="children"
                      options={hospitales}
                      onSelect={(value: string) => {
                        onSelectedHospital(value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="到达医院"
                    name={[name, "to"]}
                    rules={[{ required: true, message: "请输入到达地点" }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      size="large"
                      mode="tags"
                      placeholder="请选择到达医院"
                      optionFilterProp="children"
                      options={hospitales}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="驾驶时间"
                    name={[name, "spendTime"]}
                    rules={[{ required: true, message: "请填写驾驶时间" }]}
                  >
                    <Input placeholder="示例 00:18" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="总里程"
                    name={[name, "allMileage"]}
                    rules={[{ required: true, message: "请填写总里程数" }]}
                  >
                    <Input placeholder="示例 20" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  setFareStatus({ isView: false, isEdit: true });
                }}
                block
                icon={<PlusOutlined />}
              >
                添加新的报销行程
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default memo(BusinessMap);
