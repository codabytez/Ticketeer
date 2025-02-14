"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Ticket from "./ticket";
import AttendeeDetails from "./attendee-details";
import TicketReady from "./ticket-ready";

const Events: NextPage = () => {
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
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
    <div className="flex flex-col items-center gap-12 self-stretch">
      <div className="flex w-full max-w-[700px] p-6 md:p-12 flex-col justify-center items-center gap-8 rounded-[32px] md:rounded-[40px] border border-border bg-background-secondary">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex flex-col md:flex-row md:items-center gap-3 self-stretch">
            <h3 className="flex-1 self-stretch text-white text-3xl">
              {step === 1
                ? "Ticket Selection"
                : step === 2
                ? "Attendee Details"
                : step === 3
                ? "Ticket Ready"
                : ""}
            </h3>
            <p className="text-grey-98">Step {step}/3</p>
          </div>
          <div className="flex h-1 rounded-[5px] bg-[#0E464F]">
            <div
              className={`self-stretch rounded-[5px] bg-[#24A0B5]  transition-all duration-500`}
              style={{
                width: `${width}%`,
              }}
            />
          </div>
        </div>
        {step === 1 && (
          <Ticket
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            selectedTicket={selectedTicket}
            handleSelectTicket={handleSelectTicket}
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
