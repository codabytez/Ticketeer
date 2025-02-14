"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import Ticket from "./ticket";
import AttendeeDetails from "./attendee-details";
import TicketReady from "./ticket-ready";

const Events: NextPage = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const width = (100 / 3) * step;

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);

    // Now we can safely access localStorage
    const storedSelectedTicket = window.localStorage.getItem("selectedTicket");
    const storedStep = window.localStorage.getItem("step");

    if (storedSelectedTicket) {
      setSelectedTicket(Number(storedSelectedTicket));
    }
    if (storedStep) {
      setStep(Number(storedStep));
    }
  }, []);

  const handleSelectTicket = (ticketId: number) => {
    setSelectedTicket(ticketId);
    if (isClient) {
      window.localStorage.setItem("selectedTicket", ticketId.toString());
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      const newStep = step + 1;
      setStep(newStep);
      if (isClient) {
        window.localStorage.setItem("step", newStep.toString());
      }
    } else {
      setStep(1);
      if (isClient) {
        window.localStorage.setItem("step", "1");
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      if (isClient) {
        window.localStorage.setItem("step", newStep.toString());
      }
    }
  };

  // Don't render until we're on the client
  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-lg font-semibold">
              {step === 1
                ? "Ticket Selection"
                : step === 2
                ? "Attendee Details"
                : step === 3
                ? "Ticket Ready"
                : ""}
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold inline-block">
                Step {step}/3
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${width}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
        {step === 1 && (
          <Ticket
            handlePreviousStep={handlePreviousStep}
            selectedTicket={selectedTicket}
            handleSelectTicket={handleSelectTicket}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <AttendeeDetails
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {step === 3 && <TicketReady selectedTicket={selectedTicket} />}
      </div>
    </div>
  );
};

export default Events;
