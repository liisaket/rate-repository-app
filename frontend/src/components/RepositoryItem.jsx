import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const format = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number.toString();
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <Image
        style={styles.image}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.contentContainer}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{format(item.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{format(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{item.reviewCount}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{item.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryW,
    padding: 10,
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  languageText: {
    color: theme.colors.primaryW,
    fontSize: theme.fontSizes.body,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontWeight: theme.fontWeights.bold,
  },
});

export default RepositoryItem;
