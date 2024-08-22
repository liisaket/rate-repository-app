import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });
      if (data) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
      };
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;