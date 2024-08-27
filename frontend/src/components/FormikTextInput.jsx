import { StyleSheet, TextInput } from "react-native";
import { useField } from "formik";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
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

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      {name == "review" ? (
        <TextInput
          style={[styles.input, showError && styles.errorInput]}
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
          placeholderTextColor="#888"
          multiline
        />
      ) : (
        <TextInput
          style={[styles.input, showError && styles.errorInput]}
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
          placeholderTextColor="#888"
        />
      )}

      {showError && <Text style={styles.errorMsg}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
