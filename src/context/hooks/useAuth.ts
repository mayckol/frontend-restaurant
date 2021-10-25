import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../history";

// interface TokenResponse {
//   data: AxiosResponse;
//   token: string;
// }
interface LoginData {
  email: string;
  password: string;
}
export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      // @ts-ignore
      // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(credentials: LoginData) {
    // const {
    //   data: { access_token },
    // } = await api.post<TokenResponse>("/authenticate", data);
    api
      .get("/users", {
        params: credentials,
      })
      .then(({data}: any) => {
        const accessToken = data[0].token;
        localStorage.setItem("access_token", accessToken);
        // @ts-ignore
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        setAuthenticated(true);
        history.push("/main");
      });
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    // @ts-ignore
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
