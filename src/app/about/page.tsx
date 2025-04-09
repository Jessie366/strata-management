// src/app/about.tsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our Strata Management platform. Our mission is to simplify and improve
        the way strata properties are managed. We provide a comprehensive solution for managing
        notices, repair requests, and communication between owners and the management team.
      </p>
      <p className="text-lg mb-4">
        Our platform is designed to enhance transparency and efficiency in the management
        of strata properties, making it easier for everyone involved to stay informed and take action.
      </p>
      <p className="text-lg mb-4">
        Whether you're a property owner, tenant, or part of the management team, we strive to provide
        the tools you need to make your strata experience smoother and more organized.
      </p>
      <p className="text-lg mb-4">
        Thank you for visiting our platform. If you have any questions, please feel free to contact us.
      </p>
    </div>
  );
};

export default About;
