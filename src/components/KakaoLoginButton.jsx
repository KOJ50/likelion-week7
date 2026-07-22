import KakaoIcon from "../assets/images/kakaotalk.png";

export const KakaoLoginButton = () => {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full flex flex-row gap-4 justify-center py-2 items-center bg-[#FFE812] rounded-sm hover:cursor-pointer"
    >
      <img src={KakaoIcon} alt="카카오 로그인" className="w-8 h-8" />
      <p className="text-black font-semibold ">카카오로 계속하기</p>
    </button>
  );
};
