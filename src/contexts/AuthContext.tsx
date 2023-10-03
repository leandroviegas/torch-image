import { createContext, useState } from "react";

interface AuthContextProps {
  popup: "" | "SignIn" | "SignUp";
  setPopup: (newPopup: "" | "SignIn" | "SignUp") => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<"" | "SignIn" | "SignUp">("");

  return (
    <AuthContext.Provider value={{ popup, setPopup }}>
      {children}
    </AuthContext.Provider>
  );
}
