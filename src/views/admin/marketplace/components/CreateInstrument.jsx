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

function CreateInstrument() {
  const { postInstrument, loading } = useInstrumentStore();
  const [category, setCategory] = useState("Exchange");
  const [token, setToken] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const showToast = useShowToast();

  const handleImageUpload = (event) => {
    console.log(event)
    if (event && event.target && event.target.files) {
      const files = event.target.files;
      const imagesArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          imagesArray.push(reader.result);
          if (imagesArray.length === files.length) {
            setSelectedImages(imagesArray);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
  const handleSingleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setSelectedImages([...selectedImages, imageDataURL]);
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
      brand: brand,
    };
    if (category.toLowerCase() === "buy") {
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
        <FormLayout>
          <Formik
            initialValues={{
              title: "",
              status: category,
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
                        id="status"
                        title="Category"
                        subtitle="Choose a category that best describes your instrument."
                      />
                      <div
                        className={
                          category === "buy"
                            ? "flex flex-row justify-between space-x-2 align-baseline "
                            : ""
                        }
                      >
                        <Dropdown
                          className={category === "buy" ? "w-[500px]" : ""}
                          onChange={setCategory}
                          value={category}
                          options={[
                            "exchange",
                            "maintenance",
                            "available for borrow",
                            "buy",
                          ]}
                        />
                        {category === "buy" ? (
                          <Input
                            className={"w-1/2"}
                            placeholder="Price"
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
                          <span className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-50">
                            +
                          </span>
                        ) : (
                          <span className="mr-2 w-5 rounded-full border-gray-50 font-semibold">
                            +
                          </span>
                        )}
                        Post Instrument
                      </FormButton>
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
