"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ServicesPage() {
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
          <h1 className={`text-3xl font-bold mb-4 ${textColor} text-center`}>Our Services</h1>
          <p className={`mb-6 ${subText} text-center`}>
            At NutriLens, we offer a suite of services designed to help you take control of your nutrition and well-being. Whether you’re just starting your health journey or looking to optimize your diet, our tools and expertise are here for you.
          </p>
          <section className={`space-y-6 ${subText}`}>
            <h2 className="text-xl font-semibold mb-2">Nutrition Analysis</h2>
            <p>
              Instantly access detailed nutritional breakdowns for thousands of food products and recipes. Our advanced algorithms help you understand calories, macronutrients, vitamins, minerals, and more—so you can make informed choices every day.
            </p>
            <h2 className="text-xl font-semibold mb-2">Personalized Recommendations</h2>
            <p>
              Receive custom suggestions based on your dietary preferences, health goals, and lifestyle. NutriLens adapts to your needs, whether you’re managing a condition, training for an event, or simply aiming to eat better.
            </p>
            <h2 className="text-xl font-semibold mb-2">Meal & Diet Planning</h2>
            <p>
              Build meal plans that fit your schedule and tastes. Our platform helps you organize shopping lists, track ingredients, and stay on top of your nutrition targets.
            </p>
            <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
            <p>
              Monitor your progress with easy-to-read charts and analytics. Set goals, log meals, and celebrate your achievements as you move toward a healthier lifestyle.
            </p>
            <h2 className="text-xl font-semibold mb-2">Expert Support & Community</h2>
            <p>
              Connect with our team of nutritionists and join a supportive community. Get advice, share experiences, and stay motivated with NutriLens.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
