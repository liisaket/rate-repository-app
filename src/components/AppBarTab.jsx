import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const AppBarTab = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    color: theme.colors.primaryW,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 15,
  },
});

export default AppBarTab;
