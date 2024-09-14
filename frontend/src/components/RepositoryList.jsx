import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Sorter from "./FilterAndSorter";

export const RepositoryListContainer = ({
  repositories,
  setOrder,
  setFilter,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={<Sorter setOrder={setOrder} setFilter={setFilter} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = ({ order, setOrder, filter, setFilter }) => {
  const { repositories, fetchMore } = useRepositories({
    first: 6,
    orderBy: order.orderBy,
    orderDirection: order.orderDirection,
    searchKeyword: filter,
  });

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryList;
