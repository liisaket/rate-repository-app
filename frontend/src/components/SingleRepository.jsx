import { View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";
import { Link } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, loading, fetchMore } = useRepository({
    first: 4,
    id: id,
  });

  if (!repository) return;
  if (loading) return;

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  return (
    <FlatList
      data={repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <SingleReview id={id} item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.15}
    />
  );
};

export const SingleReview = ({ id, item, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeletion = async () => {
    console.log("pressed");
    Alert.alert(
      "Delete review",
      `Are you sure you want to delete this review of repository ${item.repository.fullName}?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: async () => {
            try {
              await deleteReview({
                variables: { id: item.id },
              });
              refetch();
            } catch (error) {
              console.log("Error occured:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.reviewText}>
        {id ? (
          <Text fontWeight="bold">{item.user.username}</Text>
        ) : (
          <Text fontWeight="bold">{item.repository.fullName}</Text>
        )}
        <Text style={styles.createdAt}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <Text>{item.text}</Text>
        {!id && (
          <View style={styles.buttonContainer}>
            <Link style={theme.blueButton} to={`/${item.repositoryId}`}>
              <Text style={theme.blueButtonText}>View repository</Text>
            </Link>
            <Pressable style={styles.deleteButton} onPress={handleDeletion}>
              <Text style={theme.blueButtonText}>Delete review</Text>
            </Pressable>
          </View>
        )}
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
  deleteButton: {
    backgroundColor: "#D6394C",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default SingleRepository;
