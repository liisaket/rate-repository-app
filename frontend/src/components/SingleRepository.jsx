import { View } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id: id },
  });

  return <View>{data ? <RepositoryItem item={data.repository} /> : null}</View>;
};

export default SingleRepository;
