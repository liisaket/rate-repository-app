import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 15,
  },
});

const AppBarTab = () => {
  return (
    <>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </>
  );
};

export default AppBarTab;
