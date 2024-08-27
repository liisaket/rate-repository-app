import * as yup from "yup";
import { Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import { CREATE_REVIEW } from "../graphql/mutations";

const initialValues = {
  owner: "",
  repository: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  owner: yup.string().required("Repository owner name is required"),
  repository: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number between 0 and 100")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  review: yup.string(),
});

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="owner" placeholder="Repository owner name" />
      <FormikTextInput name="repository" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" />
      <Pressable style={theme.blueButton} onPress={onSubmit}>
        <Text style={theme.blueButtonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [newReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, repository, rating, review } = values;
    try {
      const { data } = await newReview({
        variables: {
          review: {
            ownerName: owner,
            repositoryName: repository,
            rating: Number(rating),
            text: review,
          },
        },
      });
      if (data) {
        navigate(`/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
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

export default Review;
