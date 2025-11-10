"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function AboutPage() {
  const { theme } = useContext(ThemeContext);
  const bg = theme === "dark"
    ? "bg-gradient-to-b from-black via-gray-900 to-gray-800"
    : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-black" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subText = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div className={`relative w-full min-h-screen ${bg} transition-colors duration-300`}>
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className={`max-w-2xl w-full ${cardBg} rounded-2xl shadow-2xl p-8 border mx-auto ${borderColor}`}>
          <h1 className={`text-3xl font-bold mb-4 ${textColor} text-center`}>About Us</h1>
          <p className={`mb-6 ${subText} text-center`}>
            Welcome to NutriLens! We are passionate about empowering you to make informed nutrition choices for a healthier, happier life. Our platform combines cutting-edge technology with expert knowledge to deliver personalized insights and recommendations tailored to your unique needs.
          </p>
          <section className={`space-y-6 ${subText}`}>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              To revolutionize the way people understand and interact with food. We believe that everyone deserves access to clear, accurate, and actionable nutrition information. NutriLens is here to guide you on your journey to better health, one meal at a time.
            </p>
            <h2 className="text-xl font-semibold mb-2">Why NutriLens?</h2>
            <ul className="list-disc pl-6">
              <li>Comprehensive food database with detailed nutrition facts</li>
              <li>Personalized recommendations based on your goals and preferences</li>
              <li>Expert articles, tips, and resources to support your wellness journey</li>
              <li>Easy-to-use tools for tracking and analyzing your diet</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2">Meet the Team</h2>
            <p>
              Our team is made up of nutritionists, engineers, designers, and health enthusiasts who share a common vision: to make healthy living accessible and enjoyable for everyone. We are committed to innovation, integrity, and supporting our users every step of the way.
            </p>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>
              Have questions or feedback? We’d love to hear from you! Reach us at <a href="mailto:info@nutrilens.com" className="hover:underline">info@nutrilens.com</a> or connect with us on our social channels.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
