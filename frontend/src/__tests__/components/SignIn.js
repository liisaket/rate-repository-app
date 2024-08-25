import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { expect, jest, test } from '@jest/globals';
import { SignInContainer } from "../../components/SignIn";

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmitMock = jest.fn();
      render(
        <SignInContainer onSubmit={onSubmitMock} />
      );
      fireEvent(screen.getByPlaceholderText('Username'), 'onChangeText', 'kalle');
      fireEvent(screen.getByPlaceholderText('Password'), 'onChangeText', 'password');
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmitMock).toHaveBeenCalledTimes(1);

        const [input] = onSubmitMock.mock.calls[0];
        expect(input).toMatchObject({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});