import { useHistory } from "react-router";

interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<Props> = ({ setIsAuth }) => {
  const history = useHistory();
  function handleLogin() {
    setIsAuth(true);
    history.push("/main");
  }
  return <button onClick={handleLogin}>Login</button>;
};
export { LoginPage };
