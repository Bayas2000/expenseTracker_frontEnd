import React from "react";
import {
  UsersIcon,
  CalendarDaysIcon,
  ArrowUpRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const InvestmateIntro = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
       <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 flex items-center gap-1 text-teal-600 hover:text-teal-800 text-lg font-medium"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-2">Investmate</h1>
      <p className="text-2xl font-semibold mb-4 text-gray-700">
        Build wealth together, one step at a time.
      </p>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Investmate is a smart group-investment platform that helps friends or trusted members invest small amounts regularly to create big value over time.
      </p>

      <h2 className="text-xl font-semibold mb-6">How it Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        <div className="flex items-start gap-4">
          <UsersIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Create a Group</h3>
            <p className="text-gray-600 text-sm">
              Start or join a trusted investment group with friends.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <CalendarDaysIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Track & Grow</h3>
            <p className="text-gray-600 text-sm">
              Each month, funds are collected and tracked transparently.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ArrowUpRightIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Set Monthly Goals</h3>
            <p className="text-gray-600 text-sm">
              Decide a monthly contribution amount—like ₹1600 per person.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ArrowTrendingUpIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Invest Smartly</h3>
            <p className="text-gray-600 text-sm">
              Use the pooled amount to buy real assets like gold or invest in business plans.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <GlobeAltIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Plan for the Future</h3>
            <p className="text-gray-600 text-sm">
              Watch your group's wealth grow year by year — plan for 2030, 2040, and beyond.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheckIcon className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold text-sm">Why Investmate?</h3>
            <ul className="text-gray-600 text-sm list-disc pl-4 mt-1">
              <li>Transparent group fund tracking</li>
              <li>Real-time gold price integration</li>
              <li>Investment history and reporting</li>
              <li>Built for young and mid-age investors</li>
              <li>Simple, trusted, and future-focused</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-700 font-medium">
        Start small. Think big. Grow together.
      </p>
    </section>
  );
};

export default InvestmateIntro;
