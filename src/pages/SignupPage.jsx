import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button-common";
import Input from "../components/Input";
import { signup } from "../apis/member";

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

function SignupPage() {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPasswordValid = PASSWORD_REGEX.test(signupForm.password);
  const isSignupReady =
    Boolean(signupForm.userId.trim()) &&
    isPasswordValid &&
    signupForm.password === signupForm.passwordConfirm &&
    Boolean(signupForm.name.trim()) &&
    !isSubmitting;
  const isPasswordError = Boolean(signupForm.password) && !isPasswordValid;
  const isPasswordConfirmError =
    Boolean(signupForm.passwordConfirm) &&
    signupForm.password !== signupForm.passwordConfirm;

  const handleChange = (event) => {
    const { id, value } = event.target;

    setSignupForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isSignupReady) {
      return;
    }

    try {
      setIsSubmitting(true);

      const data = await signup({
        loginId: signupForm.userId.trim(),
        password: signupForm.password,
        name: signupForm.name.trim(),
      });

      alert(data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ??
          "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-end px-[27px] pt-[38px] pb-[39px] ph:justify-center ph:px-0 ph:pt-0 ph:pb-0">
      <form
        className="flex w-full max-w-[625px] flex-col items-center gap-13 ph:gap-16 rounded-modal bg-gray-0 px-5 pt-20 pb-24 shadow-[0_0_10px_rgba(0,0,0,0.08)]"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-center">
          <h1 className="text-header text-red-primary">회원가입</h1>
        </div>

        <section className="flex w-full flex-col items-start gap-12 p-4">
          <div className="flex w-full flex-col gap-3 text-body">
            아이디
            <Input
              id="userId"
              placeholder="아이디를 입력하세요"
              value={signupForm.userId}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full flex-col gap-3 text-body">
            비밀번호
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              minLength={8}
              maxLength={16}
              status={isPasswordError ? "error" : "default"}
              value={signupForm.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full flex-col gap-3 text-body">
            비밀번호 확인
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 입력하세요"
              maxLength={16}
              status={isPasswordConfirmError ? "error" : "default"}
              value={signupForm.passwordConfirm}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full flex-col gap-3 text-body">
            이름
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              value={signupForm.name}
              onChange={handleChange}
            />
          </div>
        </section>

        <div className="flex justify-center">
          <Button type="submit" className="w-[244px]" disabled={!isSignupReady}>
            회원가입하기
          </Button>
        </div>
      </form>
    </main>
  );
}

export default SignupPage;
