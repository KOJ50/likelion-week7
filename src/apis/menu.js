import axiosInstance from "./axiosInstance";

export const getMenuDetail = async (menuId, config = {}) => {
  const { data } = await axiosInstance.get(`/menu/${menuId}`, config);

  return data.result;
};
