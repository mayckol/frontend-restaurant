import { useContext,  useRef } from "react";
import { Context } from "../../context/AuthContext";

import styles from "./styles.module.css";
// import api from "../../api";

export function LoginPage() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);
  const { handleLogin } = useContext(Context);

  function prepareLogin() {
    const data = {
      email: "teste1@live.com",
      password: "a5s1f56AFSef16Sd1f561565",
    };
    
    handleLogin(data);
  }

  // useEffect(() => {
  //   api.get("/users").then((res: any) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    /* https://github.com/facebook/create-react-app/issues/9870 */
    <main
      style={{ backgroundImage: `url('/img/bg-login.jpg')` }}
      className={styles.container}
    >
      <h1 className="page-title text-white">Eye Restaurant</h1>
      {/* <p>{inputEmail.current?.value}</p> */}
      <form className={styles.wrapper}>
        <input
          ref={inputEmail}
          type="text"
          name="email"
          id="email"
          placeholder="email"
        />
        <input
          ref={inputPass}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button
          className={styles.btnSubmit}
          onClick={prepareLogin}
          type="button"
        >
          login
        </button>
      </form>
    </main>
  );
}
