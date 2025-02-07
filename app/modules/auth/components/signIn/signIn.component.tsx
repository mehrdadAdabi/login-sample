"use client";

import { useState } from "react";
import { BaseButton, BaseInput } from "@/app/components/base/index";
import Image from "next/image";
import bannerImg from "@/app/public/images/login.png";
import Link from "next/link";
import { authMessage } from "../../constant/auth.constant";
import { setInLocalStorage, validateEmailOrPhone } from "@/app/lib/utils";
import useAxios from "@/app/service/axiosInstance";
import { auth_routes } from "@/app/routes/route";
import { useRouter } from "next/navigation";

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validateEmailOrPhone(e.target.value);
    setEmailError(!isValid);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) setPasswordError(false);
    else setPasswordError(true);
    setPassword(e.target.value);
  };

  const { post } = useAxios();
  const handleSignIn = async () => {
    try {
      const model = {
        identifier: email,
        password: password,
      };
      const [err, data] = await post(auth_routes.login, model);
      if (err) {
        console.error(err);
        return;
      }
      setInLocalStorage("token", data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
      className="grid  gap-4 items-center md:grid-cols-1 sm:grid-cols-1  xl:grid-cols-[40%_60%]"
    >
      <div className="flex flex-col space-y-6">
        <h1 className="text-right font-bold text-xl">ورود به جابزکیت</h1>
        <div className="flex flex-col gap-3">
          <BaseInput
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="rounded-sm  box-border border-2 text-right "
            label="ایمیل یا شماره تلفن"
            error={emailError}
            helperText={emailError ? authMessage.incorrectUsername : ""}
          />

          <BaseInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
            label="رمز عبور"
            error={!passwordError}
            helperText={!passwordError ? authMessage.incorrectPassword : ""}
          />
          <div className="forgotPassword">
            <Link href="#" className="underline font-bold">
              رمز عبور خود را فراموش کرده اید؟
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <BaseButton
            value="ورود"
            type="submit"
            className="bg-white rounded-sm overflow-hidden w-full"
          >
            ورود
          </BaseButton>

          <BaseButton
            value="ورود با گوگل"
            type="submit"
            className="bg-white rounded-sm overflow-hidden w-full"
          >
            ورود با گوگل
          </BaseButton>
        </div>
      </div>

      <div className="banner text-center">
        <div className="welcome  font-bold">سلام، خوش آمدید</div>
        <Image
          src={bannerImg}
          width={700}
          height={700}
          className="m-auto"
          alt="login_banner"
        />
      </div>
    </form>
  );
}

export default SignInComponent;
