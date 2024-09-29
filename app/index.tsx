import * as React from 'react';
import { Redirect } from 'expo-router';

import { LoginScreen } from '@screens';
import { getToken } from '@api';

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    })();
  }, [token]);

  if (token) {
    return <Redirect href="/home" />;
  }

  return <LoginScreen />;
}
