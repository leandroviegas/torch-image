"use client";
import useTheme from "@/hooks/useTheme";
import { ChangeEventHandler } from "react";
import { FloatingLabelInput, ThemeStyles } from "./styles";

type ValueType = string | number | readonly string[] | undefined;

type InputProperties = {
  status: "error" | "ok";
  messages?: string[];
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  defaultValue?: ValueType;
  value?: ValueType;
  name?: string;
  label: string;
  autoComplete?: "on" | "off";
  type?:
    | "text"
    | "email"
    | "number"
    | "password"
    | "tel"
    | "datetime"
    | "textarea"
    | "datetime-local"
    | "url"
    | "select";
  children?: React.ReactNode;
};

const Index = ({
  status,
  label,
  type,
  name,
  value,
  defaultValue,
  messages,
  onChange,
}: InputProperties) => {
  const { theme } = useTheme();
  return (
    <>
      <FloatingLabelInput theme={ThemeStyles[theme]}>
        <input
          {...{ type, name, value, defaultValue, onChange }}
          placeholder=" "
        />
        <label htmlFor="">{label}</label>
        {messages?.map((message) => (
          <span key={message}>* {message}</span>
        ))}
      </FloatingLabelInput>
    </>
  );
};

Index.defaultProps = {
  status: "info",
  messages: [],
  autoComplete: "off",
  onChange: () => {},
  defaultValue: "",
  name: "",
  type: "text",
};

export default Index;
