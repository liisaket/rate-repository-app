import { View, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import theme from "../theme";
import { GET_CURRENT_USER } from "../graphql/queries";
import { SingleReview } from "./SingleRepository";

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });
  const currentUser = data?.me;
  if (loading) return;
  if (error) return;

  return (
    <FlatList
      data={currentUser.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <SingleReview id={null} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

export default MyReviews;
