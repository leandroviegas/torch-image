"use client";
import useTheme from "@/hooks/useTheme";
import { ChangeEventHandler } from "react";
import { FloatingLabelInput, ThemeStyles } from "./styles";

type ValueType = string | number | readonly string[] | undefined;

type InputProperties = {
  status: "error" | "warning" | "info";
  messages?: string[];
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  defaultValue?: ValueType;
  value?: ValueType;
  name?: string;
  id?: string;
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
  id,
  value,
  defaultValue,
  messages,
  onChange,
}: InputProperties) => {
  const { theme } = useTheme();

  return (
      <FloatingLabelInput status={status} theme={ThemeStyles[theme]}>
        {type === "textarea" ? (
          <textarea
            {...{
              name,
              ...(value != null ? { value } : { defaultValue }),
              onChange,
            }}
            placeholder=" "
          />
        ) : (
          <input
            {...{
              type,
              name,
              id,
              ...(value != null ? { value } : { defaultValue }),
              onChange,
            }}
            placeholder=" "
          />
        )}
        <label htmlFor={id}>{label}</label>
        {messages?.map((message) => (
          <span key={message}>* {message}</span>
        ))}
      </FloatingLabelInput>
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
