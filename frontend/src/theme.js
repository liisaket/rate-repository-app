import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBG: '#24292e',
    primaryW: 'white',
    mainBG: '#e1e4e8',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  blueButton: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  blueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
};

export default theme;