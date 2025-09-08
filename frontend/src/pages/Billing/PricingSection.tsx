import React from "react";
import Header from "@/components/layout/Header/Header";
import { Button } from "@/components/ui/button";
const PricingSection: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="relative isolate px-6 py-24 sm:py-16 lg:px-8">
      {/* Background blur shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[288.75px] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Title */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-blue-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>

      {/* Pricing grid */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
        {/* Hobby Plan */}
        <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 flex flex-col sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
          <h3 className="text-base font-semibold text-blue-600">Standard</h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold text-gray-900">$5</span>
            <span className="text-base text-gray-500">/month</span>
          </p>
          <p className="mt-6 text-base text-gray-600">
            The perfect plan if you're just getting started with our product.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-gray-600 sm:mt-10">
            {[
              "5 Personalized AI Recommendations per Day for Optimizing Your CV",
              "Up to 20 ATS Job Matches Daily",
             " Full Access to ATS-Optimized CV Templates"
              
            ].map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-blue-600" />
                {feature}
              </li>
            ))}
          </ul>
       
         <Button
          className="text-center  mt-8 cursor-pointer sm:mt-10 ring-1 ring-inset ring-indigo-50 py-5"
          variant={"outline"}
         >
          Get Started Today
         </Button>
        </div>

        {/* Enterprise Plan */}
        <div className="relative rounded-3xl flex flex-col bg-black p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
          <h3 className="text-base font-semibold text-blue-400">Premium</h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span className="text-5xl font-semibold text-white">$20</span>
            <span className="text-base text-gray-400">/month</span>
          </p>
          <p className="mt-6 text-base text-gray-300">
            Full access to premium features.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-gray-300 sm:mt-10">
            {[
              "70+ ATS Job Matches Daily",
              "40+ AI Recommendations per day for optimizing your CV ",
             "Full Access to ATS-Optimized CV Templates",
              "Keyword Optimization Suggestions – get tailored keyword improvements for each job posting.",
             "Export Options – download your CV in multiple formats (PDF, Word, etc.) with one click",
              
            ].map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-blue-400" />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="mt-8 sm:mt-10 py-5">Get Started Today !</Button>
        </div>
      </div>
    </div>
            </>
  );
};

// ✅ Extracted icon into component
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
    />
  </svg>
);

export default PricingSection;
