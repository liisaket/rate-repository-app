import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const Sorter = ({ setOrder, setFilter }) => {
  const [selectedValue, setSelected] = useState("Latest repositories");
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleOrder = ({ orderBy, orderDirection }) => {
    setOrder({ orderBy, orderDirection });
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Filter setFilter={setFilter} />
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

const Filter = ({ setFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setFilter(filter);
  }, [filter]);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "left",
    alignContent: "left",
    backgroundColor: theme.colors.mainBG,
  },
});

export default Sorter;
