import * as React from "react";
import { Redirect } from "expo-router";
// import { LoginScreen } from "@screens";

// import { auth } from "@api";

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [shouldShowLoginScreen, setShouldShowLoginScreen] =
  //   React.useState(true);

  // React.useEffect(() => {
  //   (async () => {
  //     const { token, tokenExpiration } = await auth();

  //     if (token && tokenExpiration && new Date(tokenExpiration) >= new Date()) {
  //       setShouldShowLoginScreen(false);
  //     }
  //   })();
  // }, []);

  // if (!shouldShowLoginScreen) {
  //   return <Redirect href="/home" />;
  // }

  // if (isLoggedIn) {
  //   return <Redirect href="/home" />;
  // }

  // return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;

  return <Redirect href="/albums" />;
}
