import { COLORS, Shapes } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  summary: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  title: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'SF-Bold',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 25,
    marginRight: 'auto',
  },
  subtitle: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'SF-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 14,
    marginTop: 13,
    marginRight: 'auto',
  },
  info: {
    color: COLORS.LIGHT_GREY,
    fontFamily: 'SF-Regular',
    fontSize: 13,
    lineHeight: 13,
    marginTop: 9,
    textTransform: 'capitalize',
  },

  pressablesView: {
    maxWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  saveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Shapes.CIRCLE,
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: COLORS.LIGHTER_GREY,
    backgroundColor: 'transparent',
  },
  saveContainerActive: {
    backgroundColor: COLORS.TINT,
    borderColor: COLORS.TINT,
  },
  saveIcon: {
    left: 0.5,
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.LIGHT_GREY,
  },
  saveIconActive: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.PRIMARY,
  },
  isDownloadedContainer: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 21,
    height: 21,
    borderRadius: Shapes.CIRCLE,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    borderColor: COLORS.LIGHT_GREY,
  },
  isDownloadedContainerActive: {
    fontSize: 12,
    top: 0.5,
    left: 0.5,
    color: COLORS.LIGHT_GREY,
  },
  isDownloadedIcon: {
    backgroundColor: COLORS.TINT,
    borderColor: COLORS.TINT,
  },
  isDownloadedIconActive: {
    color: COLORS.PRIMARY,
  },
  moreIcon: {
    fontSize: 20,
    color: COLORS.LIGHT_GREY,
  },
});