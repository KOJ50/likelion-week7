import axiosInstance from "./axiosInstance";

export const getCredit = async (config = {}) => {
  const { data } = await axiosInstance.get(
    "/api/v1/members/me/credit",
    config,
  );

  return data;
};

export const chargeCredit = async ({ amount }, config = {}) => {
  const { data } = await axiosInstance.post(
    "/api/v1/members/me/credit/charge",
    { amount },
    config,
  );

  return data;
};
