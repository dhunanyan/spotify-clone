import React from 'react';
import { Stack } from 'expo-router';

export default function SearchPlaylistLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
}