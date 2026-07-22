import axiosInstance from "./axiosInstance";

export const CART_UPDATED_EVENT = "cart:updated";

const notifyCartUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }
};

export const getCart = async (config = {}) => {
  const { data } = await axiosInstance.get("/api/v1/carts", config);
  const cart = data.result ?? data;

  return {
    cartId: cart.cartId ?? cart.cart_id,
    items: (cart.items ?? []).map((item) => ({
      cartItemId: item.cartItemId ?? item.cart_item_id ?? item.id,
      menuId: item.menuId ?? item.menu_id,
      menuName: item.menuName ?? item.menu_name ?? item.menu?.name,
      menuPrice: item.menuPrice ?? item.menu?.price,
      quantity: item.quantity,
      options: (
        item.options ?? (item.menu_option ? [item.menu_option] : [])
      ).map((option) => ({
        cartItemOptionId:
          option.cartItemOptionId ?? option.cart_item_option_id ?? option.id,
        menuOptionId:
          option.menuOptionId ?? option.menu_option_id ?? option.id,
        option: option.option,
        content: option.content,
        price: option.price,
      })),
    })),
  };
};

export const addCartItem = async (
  { menuId, quantity, menuOptionIds = [] },
  config = {},
) => {
  const { data } = await axiosInstance.post(
    "/api/v1/carts/items",
    {
      menu_id: menuId,
      quantity,
      menu_option_id: menuOptionIds,
    },
    config,
  );

  notifyCartUpdated();
  return data.result ?? data;
};

export const updateCartItem = async (
  cartItemId,
  { quantity, menuOptionIds = [] },
  config = {},
) => {
  const { data } = await axiosInstance.patch(
    `/api/v1/carts/items/${cartItemId}`,
    {
      quantity,
      menu_option_id: menuOptionIds,
    },
    config,
  );

  notifyCartUpdated();
  return data.result ?? data;
};

export const deleteCartItem = async (cartItemId, config = {}) => {
  await axiosInstance.delete(`/api/v1/carts/items/${cartItemId}`, config);
  notifyCartUpdated();
};

export const clearCartItems = async (cartItemIds, config = {}) => {
  const results = await Promise.allSettled(
    cartItemIds.map((cartItemId) =>
      axiosInstance.delete(`/api/v1/carts/items/${cartItemId}`, config),
    ),
  );
  const failedResult = results.find((result) => result.status === "rejected");

  notifyCartUpdated();

  if (failedResult) {
    throw failedResult.reason;
  }
};
