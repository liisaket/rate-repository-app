import * as yup from "yup";
import { Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import FormikTextInput from "./FormikTextInput";
import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const initialValues = {
  username: "",
  password: "",
  confirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must not be longer than 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must not be longer than 50 characters")
    .required("Password is required"),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="confirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable style={theme.blueButton} onPress={onSubmit}>
        <Text style={theme.blueButtonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [newUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await newUser({
        variables: {
          user: { username, password },
        },
      });
      if (data) {
        const data = await signIn({ username, password });
        console.log("data:", data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpContainer onSubmit={handleSubmit} />}
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

export default SignUp;
