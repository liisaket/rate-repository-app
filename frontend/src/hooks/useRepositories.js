import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  useEffect(() => {
    refetch({ orderBy, orderDirection, searchKeyword });
  }, [orderBy, orderDirection, searchKeyword, refetch]);

  return { repositories, loading, refetch };
};

export default useRepositories;