import * as Yup from "yup";

const instrumentSchema = Yup.object().shape({
  title: Yup.string().required("Title can't be empty"),
  // brand: Yup.string().required("Brand can't be empty"),
  // condition: Yup.string().required("Condition can't be empty"),
  details: Yup.string().required("Details can't be empty"),
  // postedAt: Yup.date().default(() => new Date()),
});

export default instrumentSchema;
