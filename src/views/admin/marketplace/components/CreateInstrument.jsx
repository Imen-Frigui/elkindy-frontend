import instrumentValidation from "validations/instrumentValidation";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";

import {
  Input,
  FormLayout,
  BackButton,
  AddIcon,
  FormTitle,
  FormControl,
  Label,
  ButtonsGroup,
  FormButton,
  TextArea,
  Dropdown,
  Button,
} from "../../../../components";
import { useState, useContext } from "react";
import useInstrumentStore from "store/instrumentStore";
import AutoSuggestComponent from "components/ui/AutoComplete";

function CreateInstrument({ history }) {
  const postInstrument = useInstrumentStore((state) => state.postInstrument);
  const loading = useInstrumentStore((state) => state.loading);
  const [category, setCategory] = useState("exchange");

  const options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const initialValues = {
    title: "",
    brand: "",
    status: category,
    details: "",
  };
  const handleSubmit = async (values, setSubmitting, setStatus) => {
    setSubmitting(true);
    console.log("Form values:", values);

    const statusToast = toast.loading("Please wait...", options);
    try {
      const response = await postInstrument(values);
      if (response.success) {
        setTimeout(() => {
          toast.update(statusToast, {
            render: "All is good",
            autoClose: 1000,
            type: "success",
            closeButton: true,
            isLoading: false,
          });
        }, 1000);
      }
    } catch (err) {
      setStatus({
        error: err.response?.data?.error || "Error occurred, please try again",
      });
      toast({
        render: err.response?.data?.error || "Error occurred, please try again",
        type: "error",
        autoClose: 2000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-1/2">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <BackButton className="mb-8" />
      <FormLayout>
        <Formik
          initialValues={initialValues}
          validationSchema={instrumentValidation}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            handleSubmit(values, setSubmitting, setStatus);
          }}
        >
          {({ isSubmitting, isValid, status, ...formikProps }) => (
            <>
              <AddIcon />
              <FormTitle text="Share Your Musical Gear with the Community" />
              <Form>
                <FormControl>
                  <Label
                    subtitle="Add a short, description headline"
                    title="Instrument Title"
                  />
                  <Input status={status} name="title" id="title" type="text" />
                </FormControl>
                <FormControl>
                  <Label
                    subtitle="Select the instrument brand"
                    title="Instrument Brand"
                  />
                  <AutoSuggestComponent
                    // form={formikProps}
                    // validate={true}
                    name="brand"
                  />
                </FormControl>

                <FormControl>
                  <Label
                    id="status"
                    title="Category"
                    subtitle="Choose a category that best describes your instrument."
                  />
                  <Dropdown
                    onChange={setCategory}
                    value={category}
                    options={[
                      "exchange",
                      "maintenance",
                      "available for borrow",
                      "buy",
                    ]}
                  />
                </FormControl>
                <FormControl>
                  <Label
                    title="Instrument Detail"
                    subtitle="Provide specific details about your instrument."
                    id="Details"
                  />
                  <TextArea name="details" status={status} id="details" />
                </FormControl>
                <ButtonsGroup>
                  <Button
                    text="Cancel"
                    className="bg-indigo-200 "
                    onClick={() => {
                      history.push("/admin/marketplace");
                    }}
                  />
                  {/* <button type="submit"> Add</button> */}
                  <FormButton
                    disabled={!isValid || isSubmitting}
                    className="flex items-center  bg-kindyblue hover:bg-kindydarkblue"
                  >
                    {loading ? (
                      <span className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-50"></span>
                    ) : (
                      <span className="mr-2 w-5 rounded-full border-gray-50 font-semibold">
                        +
                      </span>
                    )}
                    Post Instrument
                  </FormButton>
                </ButtonsGroup>
              </Form>
            </>
          )}
        </Formik>
      </FormLayout>
    </div>
  );
}

export default CreateInstrument;
