import React, { createElement, useEffect } from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./client/pages/mainPage";
import LoginPage from "./client/pages/loginPage";
import { Provider } from "react-redux";
import { store } from "client/store";
import { addTrack } from "client/store/action-creators/playlist";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import { useActions } from "client/hooks/useActions";
import { Navbar } from "client/components/Navbar";

const App: React.FC = (): JSX.Element => {
  const { loginUser } = useActions();
  const { accessToken, refreshToken, expiresIn } = useTypedSelector(
    state => state.currentUser
  );

  if (expiresIn && Date.now() > expiresIn) {
    window.api.spotify.setRefreshToken(refreshToken);
    window.api.spotify.refreshToken().then(res => {
      loginUser({
        accessToken: res.body.access_token,
      });
    });
  } else {
    window.api.spotify.setAccessToken(accessToken);
    window.api.spotify.setRefreshToken(refreshToken);
  }

  useEffect(() => {
    window.api.receive("add-track", () => {
      addTrack()(store.dispatch, store.getState);
    });
  }, []);

  return (
    <HashRouter>
      <Navbar />
      {accessToken ? (
        <Routes>
          <Route path="/" caseSensitive={true} element={<MainPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          {location.search.length ? (
            <Route
              path="/login"
              element={
                <LoginPage
                  code={location.search.split("=")[1].replace("&state", "")}
                />
              }
            />
          ) : null}

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" caseSensitive element={<Navigate to={"/login"} />} />
        </Routes>
      )}
    </HashRouter>
  );
};

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(createElement(WrappedApp), document.getElementById("root"));
