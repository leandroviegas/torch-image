"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import usePromise from "@/hooks/usePromise";
import { toast } from "react-toastify";
import { error } from "console";

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
  const [form, setForm] = useState<{
    usernameOrEmail: string;
    password: string;
  }>({ usernameOrEmail: "", password: "" });

  const [promises, execPromise] = usePromise({
    signIn: {
      status: "idle",
    },
  });

  const [formMessages, setFormMessages] = useState<{
    [key: string]: { message: string; type: "error" | "warning" | "info" }[];
  }>({
    usernameOrEmail: [],
    password: [],
  });

  const [formStatus, setFormStatus] = useState<"info" | "error">("info");

  useEffect(() => {
    let messages: {
      [key: string]: { message: string; type: "error" | "warning" | "info" }[];
    } = { usernameOrEmail: [], password: [] };

    if (form.usernameOrEmail.trim() === "")
      messages.usernameOrEmail = [
        ...(messages?.usernameOrEmail || []),
        { message: "Username or email is required", type: "info" },
      ];

    if (form.password.trim() === "")
      messages.password = [
        ...(messages?.password || []),
        { message: "Password is required", type: "info" },
      ];

    setFormMessages(messages);
  }, [form]);

  async function HandleSignIn(event: React.FormEvent) {
    event.preventDefault();

    if (
      ["usernameOrEmail", "password"].some(
        (key) => formMessages[key]?.length > 0
      )
    ) {
      setFormStatus("error");
      return;
    }

    const result = await execPromise(
      signIn("credentials", { ...form, redirect: false }),
      "signIn"
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

  return (
    <form className="sign-form" onSubmit={HandleSignIn}>
      <FloatingLabelInput
        onChange={(e) =>
          setForm({ ...form, usernameOrEmail: e.currentTarget.value })
        }
        name="usernameOrEmail"
        label="Username or email"
        messages={formMessages.usernameOrEmail.map((m) => m.message)}
        status={
          formStatus === "error" && formMessages.usernameOrEmail.length > 0
            ? "error"
            : "info"
        }
      />
      <FloatingLabelInput
        onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
        name="password"
        label="Password"
        type="password"
        messages={formMessages.password.map((m) => m.message)}
        status={
          formStatus === "error" && formMessages.password.length > 0
            ? "error"
            : "info"
        }
      />
      <button className="sign">Sign In</button>
    </form>
  );
};

export default Index;
