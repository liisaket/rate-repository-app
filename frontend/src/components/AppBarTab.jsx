import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

import { useQuery, useApolloClient } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const AppBarTab = () => {
  const currentUser = useQuery(GET_USER).data?.me || null;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  console.log(currentUser);
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      {currentUser && (
        <Pressable onPress={signOut}>
          <Text style={styles.text}>Sign out</Text>
        </Pressable>
      )}
      {!currentUser && (
        <Pressable>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </Pressable>
      )}
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
