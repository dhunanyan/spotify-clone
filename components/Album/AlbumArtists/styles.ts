import { StyleSheet } from "react-native";
import { COLORS } from "@config";

export const styles = StyleSheet.create({
  link: {
    marginTop: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageView: {
    width: 50,
    height: 50,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "SF-Regular",
    color: COLORS.WHITE,
    marginLeft: 16,
  },
});
