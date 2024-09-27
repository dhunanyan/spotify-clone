import * as React from "react";
import { Image, View } from "react-native";

import { styles } from "./styles";

export type AlbumBackgroundPropsType = {
  uri: string;
  darkness?: number;
};

export const AlbumBackground = ({
  uri,
  darkness = 0,
}: AlbumBackgroundPropsType) => {
  return (
    <View style={styles.albumBackground}>
      <View
        style={[
          styles.albumBackgroundDarkOverlay,
          { backgroundColor: `rgba(0, 0, 0, ${darkness})` },
        ]}
      />
      <Image
        blurRadius={100}
        style={styles.albumBackgroundBlurredImage}
        source={{ uri }}
        resizeMode="cover"
      />
    </View>
  );
};