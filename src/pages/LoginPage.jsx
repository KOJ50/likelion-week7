import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button-common";
import Input from "../components/Input";
import { MOCK_USER } from "../data/mockUser";

function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    userId: "",
    password: "",
  });

  const isLoginReady = loginForm.userId.trim() && loginForm.password.trim();

  const handleChange = (event) => {
    const { id, value } = event.target;

    setLoginForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      loginForm.userId === MOCK_USER.id &&
      loginForm.password === MOCK_USER.pw
    ) {
      navigate("/");
      return;
    }

    alert("로그인 정보가 올바르지 않습니다.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        className="flex w-full max-w-[625px] flex-col items-center gap-13 rounded-modal bg-gray-0 px-5 pt-20 pb-24 shadow-[0_0_10px_rgba(0,0,0,0.08)]"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-center">
          <h1 className="text-header text-red-primary">로그인</h1>
        </div>

        <section className="flex w-full flex-col items-center gap-9">
          <div className="flex w-full flex-col items-start gap-12 p-4">
            <div className="flex w-full flex-col gap-3 text-body">
              아이디
              <Input
                id="userId"
                placeholder="아이디를 입력하세요"
                value={loginForm.userId}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full flex-col gap-3 text-body">
              비밀번호
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={loginForm.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full text-center">
            <p className="text-caption text-gray-2">
              계정이 없나요?{" "}
              <Link className="text-red-primary" to="/signup">
                회원가입 하기
              </Link>
            </p>
          </div>
        </section>

        <div className="flex justify-center">
          <Button type="submit" className="w-[186px]" disabled={!isLoginReady}>
            로그인
          </Button>
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
