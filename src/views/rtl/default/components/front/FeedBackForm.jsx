import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEvents } from "../../../../../services/event/eventService";
import Navbar from "./Navbar";
import violinImage from "../../../../../assets/img/email.jpg";
import { createFeedback } from "../../../../../services/feedback/feedbackService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const FeedBackForm = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [feedbackData, setFeedbackData] = useState({
    entertainmentRating: 5,
    inspirationRating: 5,
    themeRelevance: 5,
    valueForMoney: 5,
    bestPart: "",
    recommend: "",
    performersQuality: {
      overallQuality: 5,
      themeAlignment: 5,
      audienceEngagement: 5,
    },
    presentersFeedback: {
        interesting: 5,
        relevant: 5,
        inspiring: 5
    },
    venueSatisfaction: true,
    venueIssues: "",
    foodQuality: 5,
    foodSelection: "",
    venueFeature: "",
    improvements: "",
    futureTopics: "",
    finalComments: "",
    contactDetails: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const handlePresenterFeedbackChange = (index, field, value) => {
//     const updatedFeedback = [...feedbackData.presentersFeedback];
//     if (!updatedFeedback[index]) {
//       updatedFeedback[index] = { interesting: 0, relevant: 0, inspiring: 0 };
//     }
//     updatedFeedback[index][field] = Number(value);
//     setFeedbackData((prevState) => ({
//       ...prevState,
//       presentersFeedback: updatedFeedback,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackToSubmit = {
      ...feedbackData,
      event: selectedEvent,
    };
    try {
      const response = await createFeedback(feedbackToSubmit);
      console.log("Feedback submitted:", response);
      // Resetting the feedback form
      setFeedbackData({
        entertainmentRating: 5,
        inspirationRating: 5,
        valueForMoney: 5,
        bestPart: "",
        recommend: "",
        performersQuality: {
          overallQuality: 5,
          themeAlignment: 5,
          audienceEngagement: 5,
        },
        presentersFeedback: {
          interesting: 5,
          relevant: 5,
          inspiring: 5
        },
        venueSatisfaction: true,
        venueIssues: "",
        foodQuality: 5,
        foodSelection: "",
        venueFeature: "",
        improvements: "",
        futureTopics: "",
        finalComments: "",
        contactDetails: {
          name: "",
          email: "",
          phone: "",
        },
      });
      // Display success toast
      toast.success("Thank you for sharing your feedback! Your response has been successfully submitted.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error("Error submitting feedback. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <div className="container mx-auto mt-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl rounded-lg bg-white p-4 shadow">
            <img
              src={violinImage}
              alt="Event Form Image"
              className="mb-4 h-auto w-full rounded-t-lg"
            />
            <h1 className="mb-2 flex justify-center text-lg font-bold animate-bounce">
              Event Feedback Form
            </h1>
            <p>Please Feel Free To Share Your Feedback Regarding The Event</p>
            <hr></hr>
            <form onSubmit={handleSubmit} className="mb-2 mt-4 space-y-4">
              <div>
                <label
                  htmlFor="event"
                  className="mb-2 block text-sm font-medium"
                >
                  Which Event Did you Attend ?
                </label>
                <select
                  id="event"
                  name="event"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  required
                >
                  <option value="">Please Select an Event</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>
              {/* Rating questions */}
              <div>
                <label
                  htmlFor="entertainmentRating"
                  className="mb-2 block text-sm font-medium"
                >
                  Overall, how entertaining was the event?
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs">Boring</span>
                  {[...Array(10)].map((x, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`rounded-full px-3 py-1 text-white ${
                        feedbackData.entertainmentRating === i + 1
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        setFeedbackData({
                          ...feedbackData,
                          entertainmentRating: i + 1,
                        })
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                  <span className="text-xs">Fantastic !</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor=" inspirationRating"
                  className="mb-2 block text-sm font-medium"
                >
                  After the event, how inspired did you feel?
                </label>
                <div className="flex gap-1">
                  <span className="text-xs">None</span>
                  {[...Array(10)].map((x, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`rounded-full px-3 py-1 text-white ${
                        feedbackData.inspirationRating === i + 1
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        setFeedbackData({
                          ...feedbackData,
                          inspirationRating: i + 1,
                        })
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                  <span className="text-xs">Fired Up!</span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="valueForMoney"
                  className="mb-2 block text-sm font-medium"
                >
                  Did you find the event worth the price of the ticket?
                </label>
                <div className="flex gap-1">
                  <span className="text-xs">Not at all</span>
                  {[...Array(10)].map((x, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`rounded-full px-3 py-1 text-white ${
                        feedbackData.valueForMoney === i + 1
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        setFeedbackData({
                          ...feedbackData,
                          valueForMoney: i + 1,
                        })
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                  <span className="text-xs">Definitely !</span>
                </div>
              </div>
              {/* Text input for best part of the event */}
              <div>
                <label
                  htmlFor="bestPart"
                  className="mb-2 block text-sm font-medium"
                >
                  What was the single best part of the musical event?
                </label>
                <textarea
                  type="text"
                  id="bestPart"
                  name="bestPart"
                  value={feedbackData.bestPart}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  placeholder="A specific performance, the atmosphere, a standout song, the lighting, the sound quality..."
                  required
                />
              </div>
              {/* Select for recommendation */}
              <div>
                <label
                  htmlFor="recommend"
                  className="mb-2 block text-sm font-medium"
                >
                  Would you recommend a similar event to a friend?
                </label>
                <select
                  id="recommend"
                  name="recommend"
                  value={feedbackData.recommend}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Yes, definitely">Yes, definitely</option>
                  <option value="Maybe, if the content was changed">
                    Maybe, if the content was changed
                  </option>
                  <option value="Maybe, if it was cheaper">
                    Maybe, if it was cheaper
                  </option>
                  <option value="No, never">No, never</option>
                </select>
              </div>
              <h1 className="mb-2 text-lg font-bold">The Performers</h1>
              <p>Evaluate Performers on how they met the criteria below</p>
              <hr className="my-4" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p>Overall Quality</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="overallQuality"
                        value={i + 1}
                        checked={
                          feedbackData.performersQuality.overallQuality ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            performersQuality: {
                              ...feedbackData.performersQuality,
                              overallQuality: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p>Theme Alignment</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="themeAlignment"
                        value={i + 1}
                        checked={
                          feedbackData.performersQuality.themeAlignment ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            performersQuality: {
                              ...feedbackData.performersQuality,
                              themeAlignment: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p>Audience Engagement</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="audienceEngagement"
                        value={i + 1}
                        checked={
                          feedbackData.performersQuality.audienceEngagement ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            performersQuality: {
                              ...feedbackData.performersQuality,
                              audienceEngagement: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
              </div>
              <h1 className="mb-2 text-lg font-bold">The Presenters</h1>
              <p>Evaluate Presenters on how they met the criteria below</p>
              <hr className="my-4" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p>Interesting</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="interesting"
                        value={i + 1}
                        checked={
                          feedbackData.presentersFeedback.interesting ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            presentersFeedback: {
                              ...feedbackData.presentersFeedback,
                              interesting: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p>Relevant</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="relevant"
                        value={i + 1}
                        checked={
                          feedbackData.presentersFeedback.relevant ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            presentersFeedback: {
                              ...feedbackData.presentersFeedback,
                              relevant: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p>Inspiring</p>
                  {[...Array(5)].map((x, i) => (
                    <label key={i} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="inspiring"
                        value={i + 1}
                        checked={
                          feedbackData.presentersFeedback.inspiring ===
                          i + 1
                        }
                        onChange={() =>
                          setFeedbackData({
                            ...feedbackData,
                            presentersFeedback: {
                              ...feedbackData.presentersFeedback,
                              inspiring: i + 1,
                            },
                          })
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{i + 1}</span>
                    </label>
                  ))}
                </div>
              </div>
              <h1 className="mb-2 text-lg font-bold">The Venue</h1>
              <hr className="my-4" />
              <div>
                <label
                  htmlFor="venueSatisfaction"
                  className="mb-2 block text-sm font-medium"
                >
                  Overall, were you satisfied with the venue and were you able
                  to see and hear the concert clearly?
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="venueSatisfaction"
                      value="Yes"
                      checked={feedbackData.venueSatisfaction === true}
                      onChange={() =>
                        setFeedbackData({
                          ...feedbackData,
                          venueSatisfaction: true,
                        })
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="venueSatisfaction"
                      value="No"
                      checked={feedbackData.venueSatisfaction === false}
                      onChange={() =>
                        setFeedbackData({
                          ...feedbackData,
                          venueSatisfaction: false,
                        })
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {/* Venue Issues Section */}
              <div>
                <label
                  htmlFor="venueIssues"
                  className="mb-2 block text-sm font-medium"
                >
                  What problems did you encounter?
                </label>
                <textarea
                  id="venueIssues"
                  name="venueIssues"
                  value={feedbackData.venueIssues}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  placeholder="Describe any issues encountered..."
                ></textarea>
              </div>

              {/* Food Quality Section */}
              <div>
                <label
                  htmlFor="foodQuality"
                  className="mb-2 block text-sm font-medium"
                >
                  How was the quality of the food?
                </label>
                <div className="flex gap-1">
                  {[...Array(10)].map((x, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`rounded-full px-3 py-1 text-white ${
                        feedbackData.foodQuality === i + 1
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        setFeedbackData({ ...feedbackData, foodQuality: i + 1 })
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="venueFeature"
                  className="mb-2 block text-sm font-medium"
                >
                  In your opinion, what is the most important feature we should
                  look for when choosing a venue?
                </label>
                <textarea
                  id="venueFeature"
                  name="venueFeature"
                  value={feedbackData.venueFeature}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2 "
                  placeholder="E.g., acoustics, location, seating, lighting, amenities, parking, safety..."
                ></textarea>
              </div>
              <h1 className="mb-2 text-lg font-bold">Final Thoughts?</h1>
              <hr className="my-4" />
              <div>
                <label
                  htmlFor="improvements"
                  className="mb-2 block text-sm font-medium"
                >
                  If you were running the event, what would you have done
                  differently?
                </label>
                <textarea
                  id="improvements"
                  name="improvements"
                  value={feedbackData.improvements}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  placeholder="E.g., scheduling, performances, sound quality, crowd management, seating arrangements, food options..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="futureTopics"
                  className="mb-2 block text-sm font-medium"
                >
                  Any suggestions for future event (charity events) topics?
                </label>
                <textarea
                  id="futureTopics"
                  name="futureTopics"
                  value={feedbackData.futureTopics}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  placeholder="Provide any suggestions .."
                ></textarea>
              </div>
              {/* Final Thoughts Section */}
              <div>
                <label
                  htmlFor="finalComments"
                  className="mb-2 block text-sm font-medium"
                >
                  Any final comments?
                </label>
                <textarea
                  id="finalComments"
                  name="finalComments"
                  value={feedbackData.finalComments}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-4 py-2 "
                  placeholder="Your final thoughts..."
                ></textarea>
              </div>

              {/* Contact Details Section */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Optional: Contact Details
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={feedbackData.contactDetails.name}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      contactDetails: {
                        ...feedbackData.contactDetails,
                        name: e.target.value,
                      },
                    })
                  }
                  className="mb-2 w-full rounded border border-gray-300 px-4 py-2"
                  placeholder="Your Name"
                />
                <div className="mb-2 flex gap-2">
                  <input
                    type="email"
                    name="contactEmail"
                    value={feedbackData.contactDetails.email}
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        contactDetails: {
                          ...feedbackData.contactDetails,
                          email: e.target.value,
                        },
                      })
                    }
                    className="flex-1 rounded border border-gray-300 px-4 py-2"
                    placeholder="E-mail"
                  />
                  <input
                    type="text"
                    name="contactPhone"
                    value={feedbackData.contactDetails.phone}
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        contactDetails: {
                          ...feedbackData.contactDetails,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="flex-1 rounded border border-gray-300 px-4 py-2"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-700"
                >
                  Submit Form
                </button>
              </div>
            </form>
            <Link to="/home">
  <IoArrowBackCircle
    className="absolute bottom-0 left-0 mb-10 ml-3 cursor-pointer"
    style={{ fontSize: '3rem' }} // Adjust fontSize to increase the size of the icon
    title="Back To Front Page interface"
  />
</Link>

<Link to="/home">
  <IoArrowForwardCircle
    className="absolute bottom-0 right-0 mb-10 ml-3 cursor-pointer"
    style={{ fontSize: '3rem' }} 
    title="Back To Front Page interface"
  />
</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackForm;
