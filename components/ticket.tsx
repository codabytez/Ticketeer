"use client";
import { NextPage } from "next";
import { Select } from "./input";
import Button from "./button";

const tickets = [
  {
    id: 1,
    title: "Regular Access",
    price: 0,
    available: 20,
  },
  {
    id: 2,
    title: "VIP Access",
    price: 50,
    available: 20,
  },
  {
    id: 3,
    title: "VVIP Access",
    price: 150,
    available: 20,
  },
];

const Ticket: NextPage<{
  selectedTicket: number | null;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSelectTicket: (ticketId: number) => void;
}> = ({
  selectedTicket,
  handleNextStep,
  handlePreviousStep,
  handleSelectTicket,
}) => {
  return (
    <div className="flex md:p-6 flex-col justify-center gap-8 self-stretch rounded-3xl md:rounded-[32px] md:border md:border-border md:bg-background-secondary">
      <div
        className="flex min-h-60 md:min-h-[200px] py-4 px-6 md:p-6 flex-col items-center justify-between md:justify-start gap-2 self-stretch rounded-3xl border-x border-b border-border"
        style={{
          background:
            "radial-gradient(57.42% 106.59% at 14.02% 32.06%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), rgba(10, 12, 17, 0.10)",
          backdropFilter: "blur(7px)",
        }}
      >
        <div className="flex flex-col items-center gap-2 self-stretch">
          <h1 className="self-stretch text-grey-98 text-center font-roadRage text-5xl md:text-[62px] leading-[100%]">
            Techember Fest ”25
          </h1>
          <p className="max-w-[340px] mx-auto text-grey-98 text-center text-sm md:text-base self-stretch">
            Join us for an unforgettable experience <br /> at Techember Fest!
            Secure your spot now.
          </p>
        </div>

        <div className="flex gap-1 flex-col justify-center items-center md:flex-row md:justify-start md:items-start md:gap-4">
          <p className="text-grey-98">Lagos, Nigeria</p>
          <p className="text-grey-98 hidden md:block">| |</p>
          <p className="text-grey-98">March 15, 2025 | 7:00 PM</p>
        </div>
      </div>
      <div className="h-1 self-stretch bg-[#07373F]" />
      <div className="flex flex-col gap-2 self-stretch">
        <p className="self-stretch text-grey-98">Select Ticket Type:</p>

        <div className="flex p-4 flex-col justify-center items-center gap-4 self-stretch rounded-3xl border border-border bg-[#052228]">
          <div className="flex gap-6 self-stretch flex-wrap">
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => {
                  const value = ticket.id;
                  localStorage.setItem("selectedTicket", value.toString());
                  handleSelectTicket(ticket.id);
                }}
                className={`flex w-full max-w-[500px] sm:w-[242px] p-2 gap-2 rounded-xl border transition-all duration-300 text-left lowercase hover:shadow-lg hover:scale-[1.02] ${
                  selectedTicket === ticket.id
                    ? "border-[#197686] bg-[#197686]"
                    : "border-[#07373F]"
                }`}
              >
                <div className="flex flex-col justify-center gap-1 flex-[1_0_0]">
                  <p className="text-grey-98 uppercase">{ticket.title}</p>
                  <p className="text-sm text-grey-98">
                    {ticket.available} left!
                  </p>
                </div>

                <div className="flex w-20 p-2 flex-col justify-center items-end gap-2.5 shrink-0 rounded-lg border-[#2BA4B9] bg-border">
                  <p className="font-medium text-xl text-grey-98 capitalize">
                    {!ticket.price ? "Free" : "$" + ticket.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Select
        placeholder="Select Number of Tickets"
        label="Number of Tickets"
        name="number-of-tickets"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          localStorage.setItem("numberOfTickets", value.toString());
        }}
        value={localStorage.getItem("numberOfTickets") || ""}
        options={Array.from({ length: 20 }, (_, i) => ({
          value: String(i + 1),
          label: (i + 1).toString(),
        }))}
      />
      <div className="flex flex-col md:flex-row md:px-12 md:justify-center md:items-center gap-4 md:gap-8 self-stretch md:rounded-3xl md:border md:border-border md:bg-background-primary">
        <Button
          variant="secondary"
          className="flex-[1_0_0]"
          onClick={handlePreviousStep}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-[1_0_0]"
          onClick={handleNextStep}
          disabled={selectedTicket === null || selectedTicket === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
