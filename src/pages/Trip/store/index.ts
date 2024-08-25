// @ts-nocheck
import dayjs from "dayjs";
import { create } from "zustand";

import envConfig from "@/config";
import convertToColonFormat from "@/shared/utils/convertToColonFormat";
import type { TripFormType, TripInfo } from "@/typings/trip.types";

type MapState = {
  tripFormData: TripInfo[];
  currentDate: string;
  repeathospital: string[];
  setTripForm: (data: TripFormType) => void;
  setCurrentDate: (date: string) => void;
  getCurrentTripInfo: () => {
    totalOil: number;
    allDestinations: string[];
    totalMilage: number;
  };
};

const initState = {
  tripFormData: [],
  repeathospital: [],
  mapDate: [],
  currentDate: "",
};

const mapStore = create<MapState>((set, get) => ({
  ...initState,
  setTripForm: (tripFormData: TripFormType) =>
    set((state) => {
      const submitedFormData = tripFormData?.mapInfo?.map((item) => {
        const average = Math.floor(Math.random() * envConfig?.map?.maxAveSpeed + envConfig?.map?.minAveSpeed);
        const randomNumber = Math.floor(Math.random() * 10);
        const MAX_SPEED = average + 30;
        return {
          ...(item ?? {}),
          spendTime: convertToColonFormat(item?.spendTime),
          startTime: `${state?.currentDate} ${item?.startTime}`,
          average,
          maxSpend: Math.floor(Math.random() * (MAX_SPEED - average + 1) + average),
          allMileage: `${item?.allMileage}.${randomNumber}`,
          expectedOil: (item?.allMileage * envConfig?.map?.aveOild)?.toFixed(2),
        };
      });
      return {
        tripFormData: submitedFormData?.sort((c, b) => +dayjs(b.startTime)?.valueOf() - +dayjs(c.startTime)?.valueOf()),
      };
    }),
  setCurrentDate: (date: string) => set(() => ({ currentDate: date })),
  getCurrentTripInfo: () => {
    const currentFormData = get().tripFormData;
    const totalOil = currentFormData.reduce((acc, current) => acc + Number(current?.expectedOil), 0);
    const allDestinations = currentFormData?.map((item) => item?.to) ?? [];
    const totalMilage = currentFormData.reduce((acc, current) => acc + Number(current?.allMileage), 0);
    return {
      totalOil,
      allDestinations,
      totalMilage,
    };
  },
}));

export default mapStore;
