import * as React from 'react';
import { View, type ImageSourcePropType } from 'react-native';
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
import { PlaylistBackground } from './PlaylistBackground';
import { PlaylistHeader } from './PlaylistHeader';
import { PlaylistCover } from './PlaylistCover';
import { PlaylistInfo } from './PlaylistInfo';
import { PlaylistSummary } from './PlaylistSummary';
import { PlaylistArtists } from './PlaylistArtists';
import { PlaylistCopyrights } from './PlaylistCopyrights';
import { PlaylistTracks } from './PlaylistTracks';
import { PlaylistRecommendedAlbums } from './PlaylistRecommendedAlbums';

import { PlaylistModel, ArtistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS, SEPARATOR } from '@config';

import { styles } from './styles';

export type PlaylistPropsType = {
  album: PlaylistModel;
  artists: ArtistModel[];
};

export const Playlist = ({ album, artists }: PlaylistPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  const imageHeight = 300;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const progress = useSharedValue(Number(!!album.id));

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

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.7, 1],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [65, 0]),
      },
    ],
  }));

  progress.value = withTiming(Number(!!album.id), { duration: 350 });

  const artistsString = React.useMemo(
    () =>
      artists.length ? artists.map((a) => a.name).join(` ${SEPARATOR} `) : '',
    [artists]
  );

  const totalDuration = React.useMemo(
    () =>
      album.tracks.items.length
        ? album.tracks.items.reduce(
            (acc, { durationMs }) => acc + durationMs,
            0
          )
        : 0,
    [album.tracks.items]
  );

  const releaseYear = React.useMemo(
    () => album.releaseDate.split('-')[0],
    [album.releaseDate]
  );

  const fallbackImageSource = React.useMemo(
    () =>
      (
        ({
          album: require(`@assets/covers/disc.png`),
          single: require(`@assets/covers/note.png`),
          artist: require(`@assets/covers/user.png`),
          compilation: require(`@assets/covers/note.png`),
          episode: require(`@assets/covers/radio.png`),
          playlist: require(`@assets/covers/note.png`),
          podcast: require(`@assets/covers/radio.png`),
          show: require(`@assets/covers/radio.png`),
        }) as unknown as { [key: string]: ImageSourcePropType }
      )[album.type],
    [album.type]
  );

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={animatedContainer}>
        <PlaylistBackground
          fallbackImageSource={fallbackImageSource}
          imageURL={album.imageURL}
          darkness={0.2}
        />
        <BackgroundOverlay
          styles={[animatedGradientOverlay, styles.albumGradientOverlay]}
          colors={['transparent', COLORS.PRIMARY]}
          startY={imageHeight / 2}
          endY={imageHeight + 70 + 90}
          height={height}
        />

        <Stack.Screen
          options={{
            headerTransparent: true,
            headerBackground: () => (
              <PlaylistHeader
                headerTitle={album.name}
                imageURL={album.imageURL}
                fallbackImageSource={fallbackImageSource}
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
          <PlaylistCover
            imageURL={album.imageURL}
            fallbackImageSource={fallbackImageSource}
            animatedValue={scrollOffset}
          />
          <PlaylistInfo
            id={album.id}
            name={album.name}
            artists={artistsString}
            albumType={album.albumType}
            releaseDate={releaseYear}
          />
          <PlaylistTracks tracks={album.tracks.items} />
          <PlaylistSummary
            releaseDate={album.releaseDate}
            totalTracks={album.tracks.total}
            totalDuration={totalDuration}
          />
          <PlaylistArtists artists={artists} />
          <PlaylistRecommendedAlbums artists={artists} />
          <PlaylistCopyrights copyrights={album.copyrights} />
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};
