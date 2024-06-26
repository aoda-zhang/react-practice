export type HospitalType = {
  label: string;
  value: string;
};
export type MapInfo = {
  // 出发时间
  startTime: string;
  // 出发地点
  from: string;
  // 到达地点
  to: string;
  // 总里程
  allMileage: number;
  // 花费时间
  spendTime: number;
  // 平均速度
  average?: number;
  // 最大速度
  maxSpend?: number;
  // 预估油费
  expectedOil?: number;
};
export type HospitalOption = {
  label: string;
  value: string;
};
export type FormValue = { spendDate: string; mapInfo: MapInfo[] };
export type FormDataType = { mapInfo: MapInfo[] };
export type MapProcessStatus = {
  isEdit: boolean;
  isFillMapDate: boolean;
  isView: boolean;
  isInfoOpen: boolean;
};
export type MapProcessStatusItem = {
  [K in keyof MapProcessStatus]?: MapProcessStatus[K];
};
