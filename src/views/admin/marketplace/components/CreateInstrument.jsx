import instrumentValidation from "validations/instrumentValidation";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import useShowToast from "../../../../hooks/useShowToast";
import React, { useEffect } from "react";
import {
  Input,
  FormLayout,
  FormTitle,
  FormControl,
  Label,
  ButtonsGroup,
  FormButton,
  TextArea,
  Dropdown,
  Button,
  AutoCompleteInput,
  ImageUploader,
} from "../../../../components";
import { useState } from "react";
import useInstrumentStore from "ZustStore/instrumentStore";
import { ToastContainer } from "react-toastify";

function CreateInstrument() {
  const { postInstrument, loading } = useInstrumentStore();
  const [category, setCategory] = useState("Exchange");
  const [age, setAge] = useState("3-5");
  const [token, setToken] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);
  const navigate = useNavigate();
  const showToast = useShowToast();

  const handleImageUpload = (files) => {
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          imagesArray.push(reader.result);
          if (imagesArray.length === files.length) {
            setSelectedImages(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImages(null);
      }
    }
  };
  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(null);
  };
  const handleSingleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setSelectedImages(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  const handleSubmit = async (values, setSubmitting, setStatus) => {
    let postData = {
      title: values.title,
      details: values.details,
      status: category.toLowerCase(),
      age: age.toLocaleLowerCase(),
      brand: brand,
      img: selectedImages,
    };
    console.log(postData)
    if (category.toLowerCase() === "sell") {
      postData.price = values.price;
    }
    setSubmitting(true);
    try {
      const response = await postInstrument(postData, token);
      showToast("Post added", "success");
      if (response.success) {
        setTimeout(() => {
          navigate("/admin/marketplace");
        }, 800);
      }
    } catch (err) {
      showToast("Error occurred, please try again", "error");
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
              age: age,
              brand: brand,
              details: "",
              price: 0,
            }}
            validationSchema={instrumentValidation}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              handleSubmit(values, setSubmitting, setStatus);
            }}
          >
            {({ isSubmitting, isValid, status }) => (
              <>
                <FormTitle text="Share Your Musical Gear with the Community">
                  <p className="font-jost text-lg text-gray-600">
                    Welcome to El Kindy Music School's Marketplace! We're
                    excited for you to share your musical gear with the
                    community.
                  </p>
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
                        subtitle="Select the instrument brand"
                        title="Instrument Brand"
                      />
                      <Dropdown
                        onChange={setAge}
                        value={age}
                        options={[
                          "3-5", "4-5", "4-6", "5-7", "7-9", "9-12", "Adult"
                        ]}
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
                          category === "sell"
                            ? "flex flex-row space-x-2 align-baseline "
                            : ""
                        }
                      >
                        <Dropdown
                          className={category === "sell" ? "w-[250px]" : ""}
                          onChange={setCategory}
                          value={category}
                          options={[
                            "exchange",
                            "maintenance",
                            "available for borrow",
                            "sell",
                          ]}
                        />
                        {category === "sell" ? (
                          <div className="relative mt-1 w-full">
                            <Input
                              className={"w-1/2"}
                              placeholder="Enter price in dinars"
                              status={status}
                              name="price"
                              id="price"
                              type="number"
                              step=".10"
                              min="0"
                              oninput="this.value = Math.abs(this.value)"
                            />
                            <div class="pointer-events-none absolute inset-0 flex w-full items-center justify-between gap-2 pl-[1.1rem]">
                              <span>
                                {/* <p class="text-xs text-gray-600 transition-all md:text-sm">
                                  Enter price in dinars
                                </p> */}
                              </span>
                              <div class="text-2xs mr-3 rounded-md bg-gray-200 px-3 py-2 font-bold text-gray-700">
                                DT
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </FormControl>
                    <FormControl>
                      <Label
                        title="Instrument Detail"
                        subtitle=""
                        id="Details"
                      />
                      <TextArea
                        placeholder="Provide specific details about your instrument."
                        name="details"
                        status={status}
                        id="details"
                      />
                    </FormControl>
                    <ButtonsGroup>
                      {loading ? (
                        <div></div>
                      ) : (
                        <Button
                          type="button"
                          text="Cancel"
                          className="bg-indigo-200 "
                        // onClick={() => {
                        //   history.push("/admin/marketplace");
                        // }}
                        />
                      )}

                      {loading ? (
                        <button
                          type="button"
                          className=""
                          disabled
                        >
                          <svg
                            class="-ml-1 mr-3 h-8 w-8 animate-spin text-kindyblue"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </button>
                      ) : (
                        <FormButton
                          disabled={!isValid || isSubmitting}
                          className="flex items-center  bg-kindyblue hover:bg-kindydarkblue"
                        >
                          Post Instrument
                        </FormButton>
                      )}
                    </ButtonsGroup>
                  </Form>
                </FormTitle>
                <ImageUploader
                  handleImageUpload={handleImageUpload}
                  selectedImages={selectedImages}
                  removeImage={removeImage}
                  handleSingleImageUpload={handleSingleImageUpload}
                />
              </>
            )}
          </Formik>
        </FormLayout>
      </div>
    </div>
  );
}

export default CreateInstrument;
