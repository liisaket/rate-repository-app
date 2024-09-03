import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useState } from "react";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import Review from "./ReviewForm";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const Main = () => {
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });

  const [filter, setFilter] = useState("");

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <RepositoryList
              order={order}
              setOrder={setOrder}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/review" element={<Review />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBG,
  },
});

export default Main;
