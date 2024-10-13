import * as React from 'react';

import { useLocalSearchParams } from 'expo-router';
import { PlaylistScreen } from '@screens';

export default function Albums() {
  const local = useLocalSearchParams();

  return <PlaylistScreen playlistId={local.playlistId as string} />;
}