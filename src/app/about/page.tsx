// src/app/about.tsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-gradient-to-r from-[#f5f5dc] to-[#fafafa]">
      <h1 className="text-4xl font-semibold text-[#4b3f3f] mb-6 text-center">About Us</h1>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Welcome to our Strata Management platform. Our mission is to simplify and improve
        the way strata properties are managed. We provide a comprehensive solution for managing
        notices, repair requests, and communication between owners and the management team.
      </p>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Our platform is designed to enhance transparency and efficiency in the management
        of strata properties, making it easier for everyone involved to stay informed and take action.
      </p>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Whether you&apos;re a property owner, tenant, or part of the management team, we strive to provide
        the tools you need to make your strata experience smoother and more organized.
      </p>
      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Thank you for visiting our platform. If you have any questions, please feel free to contact us.
      </p>
    </div>
  );
};

export default About;
