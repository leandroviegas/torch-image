"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

import api from "@/services/api";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import { toast } from "react-toastify";
import usePromise from "@/hooks/usePromise";

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });

  const [promises, execPromise] = usePromise({
    "user-create": {
      status: "idle",
    },
    "user-SignIn": {
      status: "idle",
    },
  });

  const [formMessages, setFormMessages] = useState<{
    [key: string]: { message: string; type: "error" | "warning" | "info" }[];
  }>({ email: [], username: [], password: [] });

  const [formStatus, setFormStatus] = useState<"info" | "error">("info");

  useEffect(() => {
    let messages: {
      [key: string]: { message: string; type: "error" | "warning" | "info" }[];
    } = { email: [], username: [], password: [] };

    if (form.email.trim() === "")
      messages.email = [
        ...(messages?.email || []),
        { message: "Username or email is required", type: "info" },
      ];
    else if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(form.email))
      messages.email = [
        ...(messages?.email || []),
        { message: "Invalid email", type: "error" },
      ];

    if (form.username.trim() === "")
      messages.username = [
        ...(messages?.username || []),
        { message: "Username required", type: "info" },
      ];
    else if (form.username.trim().length < 3)
      messages.username = [
        ...(messages?.username || []),
        { message: "Username is too short", type: "error" },
      ];

    if (form.password.trim() === "")
      messages.password = [
        ...(messages?.password || []),
        { message: "Password is required", type: "info" },
      ];
    else if (form.password.trim().length < 8)
      messages.password = [
        ...(messages?.password || []),
        { message: "Password is too short", type: "error" },
      ];

    setFormMessages(messages);
  }, [form]);

  async function HandleSignUp(event: React.FormEvent) {
    event.preventDefault();

    if (
      ["username", "email", "password"].some(
        (key) => formMessages[key]?.length > 0
      )
    ) {
      setFormStatus("error");
      return;
    }

    const result = await execPromise(api.post("/user", form), "user-create");

    if (result.status === "success") {
      const result = await execPromise(
        signIn("credentials", { ...form, redirect: false }),
        "user-SignIn"
      );

      if (result.status === "success") {
        ClosePopup();
      }

      if (result.status === "error") {
        toast(`Error signing in:\n ${result.error}`, {
          type: "error",
        });
      }
    }

    if (result.status === "error") {
      toast(`Error creating user:\n ${result.error}`, {
        type: "error",
      });
    }
  }

  return (
    <form className="sign-form" onSubmit={HandleSignUp}>
      <FloatingLabelInput
        label="Username"
        onChange={(e) => setForm({ ...form, username: e.currentTarget.value })}
        messages={formMessages.username.map((m) => m.message)}
        status={
          formStatus === "error" && formMessages.username.length > 0
            ? "error"
            : "info"
        }
      />
      <FloatingLabelInput
        label="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
        messages={formMessages.email.map((m) => m.message)}
        status={
          formStatus === "error" && formMessages.email.length > 0
            ? "error"
            : "info"
        }
      />
      <FloatingLabelInput
        label="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
        messages={formMessages.password.map((m) => m.message)}
        status={
          formStatus === "error" && formMessages.password.length > 0
            ? "error"
            : "info"
        }
      />
      {/* <hr /> */}
      <button className="sign">Sign Up</button>
    </form>
  );
};

export default Index;
