import { ConfigProvider } from "antd";
import { App as AtdApp } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "antd/dist/reset.css";

import App from "./App";
import envConfig from "./config";

import "./i18n";
const theme = {
  token: {
    colorPrimary: envConfig?.systemSettings?.colorPrimary,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: envConfig?.queryOptions?.refetchOnReconnect,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AtdApp>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AtdApp>
    </ConfigProvider>
  </React.StrictMode>,
);
