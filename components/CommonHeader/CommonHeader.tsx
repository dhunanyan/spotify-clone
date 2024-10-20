import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from 'expo-router';

import { Background } from '../Background';
import { MaterialIcons } from '@expo/vector-icons';

import { ALBUM_HEADER_HEIGHT, COVER_SIZE } from '@config';

import { styles } from './styles';

export type CommonHeaderPropsType = {
  type: 'album' | 'playlist';
  title: string;
  imageURL: string;
  animatedValue: SharedValue<number>;
};

export const CommonHeader = ({
  type,
  title,
  imageURL,
  animatedValue,
}: CommonHeaderPropsType) => {
  const navigation = useNavigation<AppNavigationProps>();
  const scrollYOnHeaderAppear = COVER_SIZE + COVER_SIZE * 0.05;
  const { top: topOffset } = useSafeAreaInsets();

  const animatedHeaderStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedValue.value,
      [0, COVER_SIZE * 0.75, scrollYOnHeaderAppear],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const animatedHeaderTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedValue.value,
      [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
          [10, 10, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const handlePress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container} testID="header">
      <Pressable
        style={[styles.goBackPressable, { top: topOffset }]}
        onPress={handlePress}
        testID="header-go-back-pressable"
      >
        <MaterialIcons style={styles.goBackIcon} name="keyboard-arrow-left" />
      </Pressable>

      <Animated.View
        style={[
          animatedHeaderStyles,
          { height: ALBUM_HEADER_HEIGHT, paddingTop: topOffset },
          styles.content,
        ]}
      >
        <Background type={type} imageURL={imageURL} darkness={0.4} />
        <Animated.Text
          style={[animatedHeaderTextStyles, styles.titleText]}
          testID="header-title-text"
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
