import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useSegments } from "expo-router";

import { BackgroundGradient } from "../BackgroundGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BOTTOM_NAVIGATION_HEIGHT, PAGES } from "@config";
import { translations } from "@data";

import { styles } from "./styles";

export const BottomNavigation = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const segments: string[] = useSegments();

  const isActive = (pageType: PAGES): boolean => segments[1] === pageType;

  return (
    <View style={styles.container}>
      <BackgroundGradient
        colors={["rgba(0, 0, 0, 0.85)", "rgba(0, 0, 0, 1)"]}
        styles={{ ...StyleSheet.absoluteFillObject }}
        height={BOTTOM_NAVIGATION_HEIGHT}
      />
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.HOME)}
        testID="home-pressable"
      >
        <AntDesign
          style={[styles.icon, isActive(PAGES.HOME) ? styles.active : {}]}
          name="home"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.HOME) ? styles.active : {}]}
          testID="home-text"
        >
          {translations.navigation[PAGES.HOME]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.SEARCH)}
        testID="search-pressable"
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.SEARCH) ? styles.active : {}]}
          name="search"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.SEARCH) ? styles.active : {}]}
          testID="search-text"
        >
          {translations.navigation[PAGES.SEARCH]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.LIBRARY)}
        testID="library-pressable"
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.LIBRARY) ? styles.active : {}]}
          name="library"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.LIBRARY) ? styles.active : {}]}
          testID="library-text"
        >
          {translations.navigation[PAGES.LIBRARY]}
        </Text>
      </Pressable>
    </View>
  );
};
