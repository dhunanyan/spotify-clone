import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { BackgroundGradient as BackgroundOverlay } from '../BackgroundGradient';
import { Background } from '../Background';
import { Cover } from '../Cover';
import { CommonHeader } from '../CommonHeader';
import { Tracks } from '../Tracks';
import { Summary } from '../Summary';
import { Recommendations } from '../Recommendations';
import { EmptySection } from '../EmptySection';

import { PlaylistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from '@config';

import { styles } from './styles';

export type PlaylistPropsType = {
  playlist: PlaylistModel;
};

export const Playlist = ({ playlist }: PlaylistPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  const imageHeight = 300;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const progress = useSharedValue(Number(!!playlist.id));

  const animatedGradientOverlay = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, imageHeight, imageHeight * 2, imageHeight * 2 + 1],
          [0, -imageHeight, -imageHeight * 2, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  progress.value = withTiming(Number(!!playlist.id), { duration: 350 });

  const tracksSeed = React.useMemo(() => {
    const tracks = playlist.tracks;
    const lastIndex = tracks.length - 1;

    const ids = [
      ...new Set([
        tracks[0].id,
        tracks[lastIndex].id,
        tracks[Math.floor(lastIndex / 2)].id,
        tracks[Math.floor(lastIndex / 2 / 2)].id,
        tracks[lastIndex - Math.floor((lastIndex - 1) / 2 / 2)].id,
      ]),
    ];

    return ids.length ? ids.join(',') : '';
  }, [playlist.tracks]);

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Background
          type={playlist.type}
          imageURL={playlist.imageURL}
          darkness={0.2}
        />
        <BackgroundOverlay
          styles={[animatedGradientOverlay, styles.gradientOverlay]}
          colors={['transparent', COLORS.PRIMARY]}
          startY={imageHeight / 2}
          endY={imageHeight + 70 + 90}
          height={height}
        />

        <Stack.Screen
          options={{
            headerTransparent: true,
            headerBackground: () => (
              <CommonHeader
                type={playlist.type}
                headerTitle={playlist.title}
                imageURL={playlist.imageURL}
                animatedValue={scrollOffset}
              />
            ),
          }}
        />
        <Animated.ScrollView
          style={{
            paddingTop: statusBarOffset,
            marginBottom: BOTTOM_NAVIGATION_HEIGHT,
          }}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          <Cover
            type={playlist.type}
            imageURL={playlist.imageURL}
            animatedValue={scrollOffset}
          />
          <Summary
            id={playlist.id}
            type={playlist.type}
            title={playlist.title}
            subtitle={playlist.subtitle}
            info={playlist.info}
          />
          <Tracks type={playlist.type} tracks={playlist.tracks} />
          <Recommendations type="tracks" seed={tracksSeed} />
          <EmptySection />
        </Animated.ScrollView>
      </View>
    </View>
  );
};
