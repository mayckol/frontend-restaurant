import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Context } from "./context/AuthContext";
import { Layout } from "./Layout";

import { LoginPage } from "./pages/Login";
import { MainPage } from "./pages/Main";

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  const { authenticated } = useContext(Context);
  return (
    <Switch>
      <Redirect exact path="/" to={authenticated ? "/main" : "/login"} />
      <CustomRoute exact path="/login" component={LoginPage} />
      <Layout>
        <CustomRoute isPrivate exact path="/main" component={MainPage} />
      </Layout>
    </Switch>
  );
}
