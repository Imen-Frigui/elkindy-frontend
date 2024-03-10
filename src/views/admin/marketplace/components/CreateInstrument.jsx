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
  AutoCompleteInput,
} from "../../../../components";
import { useState } from "react";
import useInstrumentStore from "store/instrumentStore";

function CreateInstrument({ history }) {
  const postInstrument = useInstrumentStore((state) => state.postInstrument);
  const loading = useInstrumentStore((state) => state.loading);
  const [category, setCategory] = useState("Exchange");
  const [brand, setBrand] = useState("");
  const brands = [
    { name: "Gibson" },
    { name: "Steinway & Sons" },
    { name: "Fender" },
    { name: "Yamaha" },
    { name: "Korg" },
    { name: "Roland" },
    { name: "Pearl" },
    { name: "DW Drums" },
    { name: "Selmer" },
    { name: "Buffet Crampon" },
    { name: "Vic Firth" },
    { name: "Zildjian" },
    { name: "Taylor" },
    { name: "Ibanez" },
    { name: "Casio" },
  ];
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
    details: "",
  };

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    setSubmitting(true);
    console.log("Form values:", values);
    console.log(category);

    // const statusToast = toast.loading("Please wait...", options);
    try {
      const response = await postInstrument(values, category.toLowerCase());
      if (response.success) {
        // setTimeout(() => {
        //   toast.update(statusToast, {
        //     render: "All is good",
        //     autoClose: 1000,
        //     type: "success",
        //     closeButton: true,
        //     isLoading: false,
        //   });
        // }, 1000);
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
    <div className="">
      <div className=" mx-auto w-full">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
        <FormLayout>
          <Formik
            initialValues={{
              title: "",
              status: category,
              brand: brand,
              details: "",
              price:""
            }}
            validationSchema={instrumentValidation}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              handleSubmit(values, setSubmitting, setStatus);
            }}
          >
            {({ isSubmitting, isValid, status, ...formikProps }) => (
              <>
                <FormTitle text="Share Your Musical Gear with the Community">
                  <p className="font-jost text-lg text-gray-600">
                    Welcome to El Kindy Music School's Marketplace! We're
                    excited for you to share your musical gear with the
                    community.
                  </p>{" "}
                </FormTitle>

                <Form>
                  <FormControl>
                    <Label subtitle="" title="Instrument Title" />
                    <Input
                      placeholder="Add a short, description headline"
                      status={status}
                      name="title"
                      id="title"
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <Label
                      subtitle="Select the instrument brand"
                      title="Instrument Brand"
                    />
                    <AutoCompleteInput
                      onChange={setBrand}
                      value={brand}
                      options={brands}
                    />
                  </FormControl>

                  <FormControl>
                    <Label
                      id="status"
                      title="Category"
                      subtitle="Choose a category that best describes your instrument."
                    />
                    <div
                      className={
                        category == "buy"
                          ? "flex flex-row justify-between space-x-2 align-baseline "
                          : ""
                      }
                    >
                      <Dropdown
                        className={category == "buy" ? "w-[500px]" : ""}
                        onChange={setCategory}
                        value={category}
                        options={[
                          "exchange",
                          "maintenance",
                          "available for borrow",
                          "buy",
                        ]}
                      />
                      {category == "buy" ? (
                        <Input
                          className={"w-1/2"}
                          placeholder=" Price"
                          status={status}
                          name="price"
                          id="price"
                          type="number"
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </FormControl>
                  <FormControl>
                    <Label title="Instrument Detail" subtitle="" id="Details" />
                    <TextArea
                      placeholder="Provide specific details about your instrument."
                      name="details"
                      status={status}
                      id="details"
                    />
                  </FormControl>
                  <ButtonsGroup>
                    <Button
                      type="button"
                      text="Cancel"
                      className="bg-indigo-200 "
                      // onClick={() => {
                      //   history.push("/admin/marketplace");
                      // }}
                    />
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
    </div>
  );
}

export default CreateInstrument;
