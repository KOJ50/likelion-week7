import axiosInstance from "./axiosInstance";

export const createOrder = async ({ memberId, cartItemIds }, config = {}) => {
  const { data } = await axiosInstance.post(
    "/orders",
    { cart_item_ids: cartItemIds },
    {
      ...config,
      params: {
        ...config.params,
        memberId,
      },
    },
  );

  return data;
};
