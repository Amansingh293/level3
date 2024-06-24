// SurveyForm.js
import React, { useState, useEffect } from "react";
import useFormValidation from "../Hooks/useFormValidation";
import validate from "../validationRules";
import axios from "axios";

const SurveyForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormValidation(initialState, validate);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/questions?topic=${topic}`
      );
      setAdditionalQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  const onSubmit = async () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      setAdditionalQuestions([]);
      await fetchAdditionalQuestions(values.surveyTopic);
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 items-start border-[1px] p-5 rounded-xl shadow-xl"
    >
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          <label>Full Name:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
        </div>
        {errors.fullName && (
          <span className="text-red-500">{errors.fullName}</span>
        )}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          <label>Email:</label>
          <input
            className="border-[1px] rounded-xl shadow-md p-1"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          <label>Survey Topic:</label>
          <select
            name="surveyTopic"
            value={values.surveyTopic}
            onChange={handleChange}
            className="border-[1px] rounded-xl shadow-md p-1"
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>
        {errors.surveyTopic && (
          <span className="text-red-500">{errors.surveyTopic}</span>
        )}
      </div>

      {values.surveyTopic === "Technology" && (
        <>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Favorite Programming Language:</label>
              <select
                name="favoriteLanguage"
                value={values.favoriteLanguage}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
            </div>
            {errors.favoriteLanguage && (
              <span className="text-red-500">{errors.favoriteLanguage}</span>
            )}
          </div>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Years of Experience:</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={values.yearsOfExperience}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              />
            </div>
            {errors.yearsOfExperience && (
              <span className="text-red-500">{errors.yearsOfExperience}</span>
            )}
          </div>
        </>
      )}

      {values.surveyTopic === "Health" && (
        <>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Exercise Frequency:</label>
              <select
                name="exerciseFrequency"
                value={values.exerciseFrequency}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
            </div>
            {errors.exerciseFrequency && (
              <span className="text-red-500">{errors.exerciseFrequency}</span>
            )}
          </div>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Diet Preference:</label>
              <select
                name="dietPreference"
                value={values.dietPreference}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              >
                <option value="">Select Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            {errors.dietPreference && (
              <span className="text-red-500">{errors.dietPreference}</span>
            )}
          </div>
        </>
      )}

      {values.surveyTopic === "Education" && (
        <>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Highest Qualification:</label>
              <select
                name="highestQualification"
                value={values.highestQualification}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {errors.highestQualification && (
              <span className="text-red-500">
                {errors.highestQualification}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 items-start">
            <div className="flex justify-start gap-3 items-center w-full">
              <label>Field of Study:</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                onChange={handleChange}
                className="border-[1px] rounded-xl shadow-md p-1"
              />
            </div>
            {errors.fieldOfStudy && (
              <span className="text-red-500">{errors.fieldOfStudy}</span>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 items-start">
        <div className="flex justify-start gap-3 items-center w-full">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            className="border-[1px] rounded-xl shadow-lg resize-none w-[15rem]"
          />
        </div>
        {errors.feedback && (
          <span className="text-red-500">{errors.feedback}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-purple-600 self-end text-white border-[1px] rounded-xl shadow-md p-2 w-[5rem]"
        disabled={isSubmitting}
      >
        Submit
      </button>

      {additionalQuestions.length > 0 && (
        <div className="border-[1px] rounded-lg shadow-lg p-2">
          <h2 className="font-bold border-b-[1px] p-1">Additional Questions</h2>
          <ul>
            {additionalQuestions.map((question, index) => (
              <li key={index} className="border-b-[1px] p-3">{index+1}{`. `}{question}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SurveyForm;
