"use client";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import { AuthPopup, ThemeStyles } from "./styles";
import SignInForm from "./Forms/SignIn";
import SignUpForm from "./Forms/SignUp";

import useTheme from "@/hooks/useTheme";
import useAuth from "@/hooks/useAuth";
import useOutsideClick from "@/hooks/useOutsideClick";
import 'animate.css';

const Index = () => {
  const { theme } = useTheme();

  const { popup, setPopup } = useAuth();

  const [authProviderRef] = useOutsideClick(() => setPopup(""));

  return (
    <AuthPopup className="animate__animated animate__fadeInDown animate__faster" theme={ThemeStyles[theme]} ref={authProviderRef}>
      <div className="tab-buttons">
        <button
          className={`${popup == "SignIn" && "active"}`}
          onClick={() => setPopup("SignIn")}
        >
          Sign In
        </button>
        <button
          className={`${popup == "SignUp" && "active"}`}
          onClick={() => setPopup("SignUp")}
        >
          Sign Up
        </button>
      </div>
      <div className="separators">
        <hr />
        <span>Social Media</span>
      </div>
      <div className="social-auth">
        <button onClick={() => signIn("google")} className="google-auth">
          <FcGoogle size={20} /> Sign In with Google
        </button>
      </div>
      <div className="separators">
        <hr />
        <span>Or</span>
      </div>
      <div>
        {popup == "SignIn" ? (
          <SignInForm ClosePopup={() => setPopup("")} />
        ) : (
          <SignUpForm ClosePopup={() => setPopup("")} />
        )}
      </div>
    </AuthPopup>
  );
};

export default Index;
