import { App, AutoComplete, Button, Form, Input, Space } from "antd";
import { type FC, memo, useCallback, useEffect } from "react";
import "dayjs/locale/zh-cn";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import envConfig from "@/config";
import historyAPI from "@/pages/History/apis";
import queryKeys from "@/shared/constants/queryKeys";
import globalStore from "@/store/globalStore";
import type { TripFormType } from "@/typings/trip.types";

import mapAPI from "../apis";
import mapStore from "../store";

import styles from "./index.module.scss";

const EditMap: FC = () => {
  const { destinations, setTripStatus, setDestination, latestTrip, setLatestTrip } = globalStore();
  const { setTripForm, setCurrentDate, currentDate } = mapStore();
  const [form] = Form.useForm();
  const navagite = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { data } = useQuery([queryKeys.GET_HOSPITALS], mapAPI.getHospitalList);
  const addHospitalMutation = useMutation(mapAPI.addHospitals, {
    onSuccess: (insertAccount) => {
      message.success(`新增${insertAccount}条医院数据`);
      queryClient.invalidateQueries(queryKeys.GET_HOSPITALS);
    },
  });
  const addHistorisMutation = useMutation(historyAPI.addmapHistory, {
    onSuccess: (_value, params) => {
      message.success(`${params?.spendDate}报销已保存`);
    },
    onError: (_value, params) => {
      message.warning(`${params?.spendDate}报销未成功保存`);
    },
  });
  const updateHospitals = async (value: TripFormType) => {
    const fullHospitals = value?.mapInfo?.map((item) => [item?.from, item?.to])?.flat(Number.POSITIVE_INFINITY);
    await addHospitalMutation.mutate(fullHospitals);
  };
  const addHistory = async (value: TripFormType) => {
    const mapHistory = value?.mapInfo?.map((item) => ({
      ...item,
      from: item?.from,
      to: item?.to,
    }));
    addHistorisMutation.mutate({
      spendDate: currentDate,
      mapInfo: mapHistory,
    });
  };
  const onFinish = (value: TripFormType) => {
    if (value?.mapInfo?.length > 0) {
      updateHospitals(value);
      addHistory(value);
      setLatestTrip(value);
      setTripForm(value);
      setTripStatus({ isEdit: false, isView: true });
      navagite("/trip/view");
    } else {
      message.error(envConfig?.map?.no_map_message);
    }
  };
  const addNewTripItem = (add) => {
    const formValue = form.getFieldsValue()?.mapInfo;
    if (formValue?.length > 0) {
      const lastTargetHospital = formValue?.[formValue?.length - 1]?.to;
      add({ from: lastTargetHospital });
    }
    setTripStatus({ isView: false, isEdit: true });
  };
  useEffect(() => {
    const hospitalList = data?.map((item) => ({
      label: item?.name,
      value: item?.name,
    }));
    setDestination(hospitalList);
  }, [data, setDestination]);
  return (
    <div className={styles.edit}>
      <Input
        className={styles.date}
        placeholder={t("map.view_date")}
        pattern="^\\d{8}$"
        onChange={(e) => setCurrentDate(dayjs(e.target.value).format("YYYY.MM.DD"))}
      />
      {
        <Form name="edit" onFinish={onFinish} autoComplete="true" form={form} initialValues={latestTrip}>
          <Form.List name="mapInfo">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 4 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "startTime"]}
                      rules={[{ required: true, message: "请填写出发时间" }]}
                    >
                      <Input placeholder={t("map.edit_startTime")} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "from"]}
                      rules={[{ required: true, message: "请填写出发地点" }]}
                    >
                      <AutoComplete
                        allowClear={true}
                        options={destinations}
                        placeholder={t("map.edit_startPlace")}
                        filterOption={(inputValue, option) =>
                          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "to"]}
                      rules={[{ required: true, message: "请填写到达地点" }]}
                    >
                      <AutoComplete
                        allowClear={true}
                        options={destinations}
                        placeholder={t("map.edit_startPlace")}
                        filterOption={(inputValue, option) =>
                          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "spendTime"]}
                      rules={[
                        {
                          required: true,
                          message: t("map.driveTime_pattern"),
                          pattern: /^\d{4}$/,
                        },
                      ]}
                    >
                      <Input placeholder={t("map.driveTime")} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "allMileage"]}
                      rules={[{ required: true, message: "请填写总里程数" }]}
                    >
                      <Input placeholder={t("map.view_totalDistance")} />
                    </Form.Item>
                    <FloatButton.Group shape="square" className={styles.floatButton}>
                      <FloatButton
                        icon={<MinusOutlined />}
                        onClick={() => {
                          if (form.getFieldsValue()?.mapInfo?.length > 1) {
                            remove(name);
                          }
                        }}
                      />
                      <FloatButton
                        icon={<PlusOutlined />}
                        onClick={() => {
                          addNewTripItem(add);
                        }}
                      />
                      <FloatButton.BackTop visibilityHeight={0} />
                    </FloatButton.Group>
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          <div className={styles.buttons}>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                {t("map.check_mapDetails")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      }
    </div>
  );
};

export default memo(EditMap);
