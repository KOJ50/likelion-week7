import axiosInstance from "./axiosInstance";

export const getStores = async (config = {}) => {
  const { data } = await axiosInstance.get("/stores", config);

  return data.result?.stores ?? data.stores ?? [];
};
