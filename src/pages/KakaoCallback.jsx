import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveAccessToken } from "../apis/axiosInstance";
import axiosInstance from "../apis/axiosInstance";

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRequested = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code || isRequested.current) return;
    isRequested.current = true;

    const sendCodeToBackend = async () => {
      try {
        const response = await axiosInstance.post("/members/auth/kakao", {
          code,
        });

        saveAccessToken(response.data.result.access_token);
        navigate("/", { replace: true });
      } catch (error) {
        console.error("에러 발생:", error);
        console.log("status:", error.response?.status);
        console.log("data:", error.response?.data);

        alert("카카오 로그인에 실패했습니다.");
        navigate("/login");
      }
    };

    sendCodeToBackend();
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-body text-gray-2">카카오 로그인 처리중입니다...</p>
    </div>
  );
}

export default KakaoCallback;
