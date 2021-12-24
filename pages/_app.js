import React, { useEffect, useState } from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { parseCookies } from "../src/utils/parseCookies";
import { KEY_SESSION_USER } from "../src/utils/constants";
import { AppPageLoader } from "../src/components/atoms";
import GlobalStyles from "../src/components/styles/globalStyles";
import withData, { setToken } from "../src/config/configureClient";
import analytics from "../helpers/analytics";
import "../styles/antd.less";

function JuicyPieApp({
  Component,
  pageProps,
  apollo,
  store,
  authUser,
  accessToken,
}) {
  accessToken && setToken(accessToken);
  useEffect(() => {
    const path = Router.pathname;
    return async () => {
      if (path.includes("?")) {
        return;
      }
      await store.dispatch({ type: "STORE_ROUTE", payload: path });
    };
  }, []);

  useEffect(() => {
    analytics.page();
  }, []);

  return (
    <ApolloProvider client={apollo}>
      <Provider store={store}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-phone-number-input@3.x/bundle/style.css"
          />
          <link rel="preconnect" href="//api.juicypie.com" />
          <link rel="dns-prefetch" href="//api.juicypie.com" />
          <link
            rel="preload"
            href="/fonts/Proxima-Nova-Thin.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/ProximaNova-Regular.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Proxima-Nova-Bold.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Proxima-Nova-Extrabold.otf"
            as="font"
            crossOrigin=""
          />
          <link href="/fonts/fonts.css" rel="stylesheet" />
        </Head>
        <Component {...pageProps} authUser={authUser} client={apollo} />
        <GlobalStyles />
      </Provider>
    </ApolloProvider>
  );
}

JuicyPieApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const {
    ctx: { req, res },
  } = appContext;

  const cookies = parseCookies(req);
  let authUser;
  let accessToken = "";
  try {
    authUser =
      cookies[KEY_SESSION_USER] && JSON.parse(cookies[KEY_SESSION_USER]);
    accessToken = authUser && authUser.token;
  } catch (e) {
    console.log(e);
  }

  return { ...appProps, authUser, accessToken };
};

export default withData(JuicyPieApp);
