import React from "react";
import { GoGoal } from "react-icons/go";
import { HiBeaker } from "react-icons/hi2";
import { RiCommunityFill } from "react-icons/ri";

const About = () => {
  return (
    <div className="container">
      <div className="text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          About HospitalHub
        </h1>
        <p className="text-gray-600 mt-2">
          Your trusted platform for hospital information and healthcare access.
        </p>
      </div>

      <hr className="border-t border-gray-200 my-8" />

      <div className="md:flex items-center">
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/ourJourney.svg"
            alt="Our Journey"
            className="md:w-3/4 object-cover pointer-events-none rounded-lg "
          />
        </div>
        <div className="md:w-1/2 p-4 md:px-14 text-justify">
          <h2 className="text-3xl font-bold text-secondary flex items-center gap-2">
            Our Vision for Better Healthcare
          </h2>
          <p className="text-gray-700 mt-3">
            At <strong>HospitalHub</strong>, we strive to bridge the gap between
            patients and hospitals by providing a user-friendly and efficient platform.
            Our mission is to simplify hospital search, ensuring users can 
            access reliable information, specialities, and ratings easily.
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-8" />

      <div className="md:flex gap-6">
        <div className="card w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <GoGoal className="text-primary text-4xl" /> Our Mission
          </h2>
          <p className="text-gray-700 mt-2">
            Our mission is to provide accurate, up-to-date hospital details 
            and enable users to find top-rated healthcare facilities across different cities.
            We believe in transparency and accessibility for every patient.
          </p>
        </div>

        <div className="card w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <HiBeaker className="text-primary text-4xl" /> Our Approach
          </h2>
          <p className="text-gray-700 mt-2">
            HospitalHub uses advanced search & filter features to 
            ensure users find hospitals based on location, specialty, and ratings.
            Our AI-powered system ensures smooth navigation & user experience.
          </p>
        </div>

        <div className="card w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <RiCommunityFill className="text-primary text-4xl" /> Our Community
          </h2>
          <p className="text-gray-700 mt-2">
            HospitalHub is not just a search platform, it's a growing community.
            We work closely with hospitals, doctors, and medical experts to 
            bring the best healthcare facilities to our users.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <a href="/" className="button">
          🏠 Back to Home
        </a>
      </div>
    </div>
  );
};

export default About;
