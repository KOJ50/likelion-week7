import axiosInstance from "./axiosInstance";

export const signup = async ({ loginId, password, name }) => {
  const { data } = await axiosInstance.post("/members", {
    login_id: loginId,
    password,
    name,
  });

  return data;
};

export const login = async ({ loginId, password }) => {
  const { data } = await axiosInstance.post("/members/auth/login", {
    login_id: loginId,
    password,
  });

  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/members/auth/logout");

  return data;
};

export const getMyInfo = async (config = {}) => {
  const { data } = await axiosInstance.get("/members/me", config);
  const member = data.result ?? data;

  return {
    ...member,
    memberId: member.memberId ?? member.member_id,
    loginId: member.loginId ?? member.login_id,
  };
};
