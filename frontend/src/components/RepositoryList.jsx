import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";
import { Menu, Button } from "react-native-paper";

export const RepositoryListContainer = ({ repositories, setOrder }) => {
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
      ListHeaderComponent={<Sorter setOrder={setOrder} />}
    />
  );
};

const RepositoryList = ({ order, setOrder }) => {
  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer repositories={repositories} setOrder={setOrder} />
  );
};

const Sorter = ({ setOrder }) => {
  const [selectedValue, setSelected] = useState("Latest repositories");
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleOrder = ({ orderBy, orderDirection }) => {
    setOrder({ orderBy, orderDirection });
    closeMenu();
  };

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button style={styles.menuText} onPress={openMenu}>
            {selectedValue}
          </Button>
        }
      >
        <Menu.Item title="Select an item..." />
        <Menu.Item
          title="Latest repositories"
          onPress={() => {
            setSelected("Latest repositories");
            handleOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" });
          }}
        />
        <Menu.Item
          title="Highest rated repositories"
          onPress={() => {
            setSelected("Highest rated repositories");
            handleOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
          }}
        />
        <Menu.Item
          title="Lowest rated repositories"
          onPress={() => {
            setSelected("Lowest rated repositories");
            handleOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
          }}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "left",
    backgroundColor: theme.colors.mainBG,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryList;
