import * as yup from "yup";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik, useFormik } from "formik";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={theme.blueButton} onPress={onSubmit}>
        <Text style={theme.blueButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log("data:", data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInContainer onSubmit={handleSubmit} />}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryW,
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  input: {
    fontFamily: theme.fonts.main,
    height: 50,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    fontSize: theme.fontSizes.subheading,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  errorMsg: {
    color: theme.colors.error,
  },
});

export default SignIn;
