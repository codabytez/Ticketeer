"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Button from "./button";

const About: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex max-w-[800px] p-6 md:p-12 flex-col justify-center items-center gap-8 rounded-3xl md:rounded-[48px] border border-border bg-background-primary">
      <p className="self-stretch text-white text-sm md:text-base">
        Event Ticket Booking UI – Open Source Practice Project 🎟️
        <br />
        <br />
        Overview
        <br />
        <br />
        This is a beginner-friendly yet practical Event Ticket Booking UI
        designed for developers to clone, explore, and build upon. The design
        focuses on a seamless, login-free ticket reservation flow, allowing
        users to book event tickets quickly and efficiently.
        <br />
        <br />
        The project consists of a three-step ticket booking flow, and developers
        can extend it further by integrating payment solutions, user
        authentication (optional), and ticket validation systems.
        <br />
        <br />
        Flow & Features
        <br />
        <br />
        1️⃣ Ticket Selection • Users can browse available tickets (Free & Paid).
        • Ticket options are displayed in a list or card view. • For Free
        Tickets → Clicking “Get Free Ticket” proceeds to attendee details. • For
        Paid Tickets → Clicking “Purchase Ticket” would ideally open a payment
        modal.
        <br />
        <br />
        2️⃣ Attendee Details Form • Users input their Name, Email, and optional
        Phone Number. • Profile picture upload option with preview
        functionality. • Ticket summary is visible to ensure users review their
        details before submission.
        <br />
        <br />
        3️⃣ Payment or Success Page • If the ticket is free, the user is taken
        directly to the Ticket Confirmation Page. • If the ticket is paid,
        developers can integrate Stripe, Paystack, or Flutterwave to process
        payments before showing the confirmation page. • Upon successful
        booking, users should receive: • A visual ticket preview with a unique
        QR Code. • An option to download the ticket as PDF or save it to their
        device. • An email confirmation containing ticket details. How to Build
        This 🚀
        <br />
        <br />
        This UI can be implemented using:
        <br />
        <br />
        📌 Frontend (Next.js or React) • Component Breakdown: • TicketCard.tsx →
        Displays ticket details • AttendeeForm.tsx → Captures user details •
        PaymentModal.tsx → Handles payment processing • SuccessScreen.tsx →
        Shows the final ticket preview • State Management: React’s Context API,
        Zustand, or Redux (if needed). • File Handling: Users should be able to
        upload images (profile picture for ticket) using Firebase Storage,
        Cloudinary, or local preview with URL.createObjectURL().
        <br />
        <br />
        📌 Backend (Optional) • If persistence is required, a backend can be
        built using: • Node.js & Express or Firebase Functions • Database:
        MongoDB, PostgreSQL, or Firebase Firestore to store ticket records
        <br />
        <br />
        📌 Payment Integration • For paid events, developers should integrate: •
        Stripe Checkout (for international transactions) • Paystack or
        Flutterwave (for African users) What You’ll Learn 🧑‍💻 • File handling &
        validation (profile picture uploads). • Dynamic UI updates based on
        ticket selection. • Persisting bookings using local state or a backend.
        • Integrating payment gateways for ticket purchases. • Generating &
        validating QR Codes for event check-in (Advanced). Need Help? Reach Out!
        💬
      </p>

      <p className="self-stretch text-white text-center font-roboto text-[40px] md:text-[80px] leading-[150%]">
        💛 Enjoy
      </p>

      <div className="flex flex-col md:flex-row md:py-4 md:px-12 justify-center items-center gap-8 rounded-2xl md:border md:border-border md:bg-background-primary self-stretch">
        <Button
          variant="tertiary"
          className="flex-[1_0_0]"
          onClick={() => router.push("https://ticketeer-alpha.vercel.app/")}
        >
          Live Preview
        </Button>

        <Button
          variant="primary"
          className="flex-[1_0_0]"
          onClick={() => router.push("https://github.com/codabytez/Ticketeer")}
        >
          Github code
        </Button>
      </div>
    </div>
  );
};

export default About;
