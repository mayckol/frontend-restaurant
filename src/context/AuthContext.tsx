import { createContext, ReactNode } from "react";
import useAuth from "./hooks/useAuth";

type Props = {
  children: ReactNode;
};

type LoginData = {
  email: string,
  password: string
}

const Context = createContext({
  authenticated: false,
  loading: false,
  handleLogin: (data: LoginData) => {},
  handleLogout: () => {},
});

function AuthProvider({ children }: Props) {
  const { authenticated, loading, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, handleLogin, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
