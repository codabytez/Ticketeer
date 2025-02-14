"use client";
import { NextPage } from "next";
import Button from "./button";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import TicketCard from "./ticket-card";

const TicketReady: NextPage<{
  selectedTicket: number | null;
}> = ({ selectedTicket }) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    profilePhoto: "",
    numberOfTickets: "",
  });

  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName") || "";
    const storedEmail = localStorage.getItem("attendeeEmail") || "";
    const storedProfilePhoto =
      localStorage.getItem("attendeeProfilePhoto") || "";
    const storedNumberOfTickets = localStorage.getItem("numberOfTickets") || "";

    setData({
      fullName: storedFullName,
      email: storedEmail,
      profilePhoto: storedProfilePhoto,
      numberOfTickets: storedNumberOfTickets,
    });
  }, []);

  const handleBookAnotherTicket = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("selectedTicket");
    localStorage.removeItem("numberOfTickets");
    localStorage.removeItem("attendeeEmail");
    localStorage.removeItem("attendeeProfilePhoto");
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("projectDescription");
    localStorage.removeItem("step");
    window.location.reload();
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      // Create canvas from the ticket element
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Enable CORS for images
        backgroundColor: null, // Transparent background
      });

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `techember-fest-ticket-${data.fullName}.png`;
          link.href = url;
          link.click();

          // Cleanup
          URL.revokeObjectURL(url);
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
    }
  };

  return (
    <div className="flex md:p-6 flex-col justify-center items-center gap-8 self-stretch">
      <div className="flex flex-col md:items-center gap-3 md:gap-4 self-stretch">
        <p className="self-stretch text-white md:text-center text-[24px] leading-[140%] md:text-3xl font-bold md:font-normal">
          Your Ticket is Booked!
        </p>
        <p className="self-stretch text-grey-98 md:text-center">
          You can download or Check your email for a copy
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 self-stretch">
        <TicketCard
          data={data}
          ticketRef={ticketRef}
          selectedTicket={selectedTicket}
        />
        <div className="flex flex-col md:flex-row md:px-12 md:justify-center md:items-center gap-2.5 md:gap-8 self-stretch md:rounded-3xl md:border md:border-border md:bg-background-primary">
          <Button
            variant="secondary"
            className="flex-[1_0_0]"
            onClick={() => handleBookAnotherTicket()}
          >
            Book Another Ticket
          </Button>
          <Button
            variant="primary"
            className="flex-[1_0_0]"
            onClick={handleDownloadTicket}
          >
            Download Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
