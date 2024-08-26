import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  if (loading) return;
  if (error) return;

  return (
    <FlatList
      data={data.repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <SingleReview item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const SingleReview = ({ item }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.reviewText}>
        <Text fontWeight="bold">{item.user.username}</Text>
        <Text style={styles.createdAt}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.primaryW,
    padding: 15,
  },
  ratingContainer: {
    marginRight: 15,
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryW,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: 18,
  },
  reviewText: {
    flex: 1,
  },
  createdAt: {
    color: theme.colors.textSecondary,
    marginTop: 1,
    marginBottom: 10,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

export default SingleRepository;
