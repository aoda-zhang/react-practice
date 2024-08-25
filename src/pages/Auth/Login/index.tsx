import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import pwd from "@/shared/assets/images/password.png";
import storage from "@/shared/utils/storage";
import globalStore from "@/store/globalStore";
import type { AuthFieldType } from "@/typings/auth.types";
import StorageKeys from "@/typings/storage.types";

import authAPI from "../apis";

import style from "./index.module.scss";
import LanSwitcher from "@/shared/components/LanSwitcher";
import envConfig from "@/config";
import ImageWithSkeleton from "@/shared/components/ImageWithSkeleton";

const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUserInfo } = globalStore();
  const { mutate, isLoading } = useMutation(authAPI.login, {
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(StorageKeys.accessToken, loginInfo?.accessToken);
        storage.set(StorageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate("/trip/edit");
      }
    },
  });
  return (
    <div className={style.loginBox}>
      <div className={style.welcomeBanner}>
        <ImageWithSkeleton
          imgSrc={envConfig?.login?.loginBannerURL}
          title={t("login.welcome")}
          className={style.loginBG}
        />
      </div>

      <div className={style.loginForm}>
        <div className={style.welcome}>
          <span className={style.text}>{t("login.welcome")}</span>
          <LanSwitcher />
        </div>
        <Form
          layout="vertical"
          className={style.form}
          name="login"
          onFinish={(value) => {
            mutate({
              userName: value?.userName,
              password: value?.password,
            });
          }}
          autoComplete="on"
        >
          <Form.Item<AuthFieldType>
            label={t("login.userName")}
            name="userName"
            rules={[{ required: true, message: t("login.userName_required") }]}
          >
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>

          <Form.Item<AuthFieldType>
            label={t("login.password")}
            name="password"
            rules={[{ required: true, message: t("login.password_required") }]}
          >
            <Input.Password
              size="large"
              prefix={<img src={pwd} alt="password" className={style.pwd} />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className={style.submitBtn}
            >
              {t("login.primary_login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default memo(Login);
