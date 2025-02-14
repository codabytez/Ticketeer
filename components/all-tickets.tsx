"use client";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { NextPage } from "next";
import TicketCard from "./ticket-card";

const TicketsPage: NextPage = () => {
  interface Ticket {
    fullName: string;
    email: string;
    profilePhoto: string;
    numberOfTickets: string;
    selectedTicket: number;
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets") || "{}";
    const parsedTickets = Object.values(JSON.parse(storedTickets)) as Ticket[];
    setTickets(parsedTickets);
  }, []);

  const handleDownloadTicket = async (
    ticketRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `techember-fest-ticket.png`;
          link.href = url;
          link.click();
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
    <div className="flex flex-col items-center gap-12 self-stretch">
      <div className="flex w-full max-w-[700px] p-6 md:p-12 flex-col justify-center items-center gap-8 rounded-[32px] md:rounded-[40px] border border-border bg-background-secondary">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex flex-col md:flex-row md:items-center gap-3 self-stretch">
            <h3 className="flex-1 self-stretch text-white text-3xl">
              My Tickets
            </h3>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="flex flex-col gap-4">
            {tickets.map((ticket, index) => (
              <div className="flex flex-col relative" key={index}>
                <TicketCard
                  ticketRef={ticketRef}
                  data={ticket}
                  selectedTicket={ticket.selectedTicket}
                />
                <button
                  onClick={() => handleDownloadTicket(ticketRef)}
                  className="justify-end flex md:absolute md:bottom-0 md:right-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FFF"
                    width={24}
                    height={24}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {tickets.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>No tickets found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
