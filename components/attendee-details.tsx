"use client";
import { NextPage } from "next";
import { Input, Textarea } from "./input";
import Button from "./button";
import { useEffect, useState } from "react";
import Image from "next/image";

const AttendeeDetails: NextPage<{
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}> = ({ handleNextStep, handlePreviousStep }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    projectDescription: "",
    profilePhoto: "",
  });

  // Update localStorage when form values change
  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName") || "";
    const storedEmail = localStorage.getItem("attendeeEmail") || "";
    const storedProfilePhoto = localStorage.getItem("profilePhoto") || "";
    const storedProjectDescription =
      localStorage.getItem("projectDescription") || "";

    setData({
      fullName: storedFullName,
      email: storedEmail,
      profilePhoto: storedProfilePhoto,
      projectDescription: storedProjectDescription,
    });

    setImagePreview(storedProfilePhoto);
  }, []); // Empty dependency array means this runs once when component mounts

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "user_photos"); // Replace with your Cloudinary upload preset

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dn0pkgtpt/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      localStorage.setItem("attendeeProfilePhoto", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // const handleContainerClick = () => {
  //   fileInputRef.current?.click();
  // };

  const handleImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      localStorage.setItem("profilePhoto", reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const imageUrl = await uploadToCloudinary(file);
      setData({ ...data, profilePhoto: imageUrl });
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0].replace(/-/g, "");
  };

  const generateTicketId = (date: Date): string => {
    const datePart = formatDate(date);
    const timePart = date.getTime().toString().slice(-4);
    return `ticket-${datePart}-${timePart}`;
  };

  const onSubmit = (formData: {
    fullName: string;
    email: string;
    projectDescription: string;
  }) => {
    // Get current date for ticket ID
    const creationDate = new Date();

    // Get current stored values
    const numberOfTickets = localStorage.getItem("numberOfTickets") || "1";
    const selectedTicket = localStorage.getItem("selectedTicket") || "1";
    const profilePhoto = localStorage.getItem("attendeeProfilePhoto") || "";

    // Create ticket data
    const ticketData = {
      ...formData,
      profilePhoto,
      selectedTicket,
      numberOfTickets,
      createdAt: creationDate.toISOString(),
    };

    // Get existing tickets or initialize empty object
    const existingTickets = JSON.parse(localStorage.getItem("tickets") || "{}");

    // Generate unique ticket ID
    const ticketId = generateTicketId(creationDate);

    // Add new ticket to existing tickets
    const updatedTickets = {
      ...existingTickets,
      [ticketId]: ticketData,
    };

    // Save to localStorage
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    // Save current ticket ID for reference
    localStorage.setItem("currentTicketId", ticketId);

    handleNextStep();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
      className="flex md:p-6 flex-col justify-center gap-8 self-stretch md:rounded-[32px] md:border md:border-border md:bg-background-secondary"
    >
      <label
        htmlFor="upload-photo"
        className="flex p-6 max-w-[556px] flex-col gap-8 self-stretch rounded-3xl border border-[#07373F] bg-[#052228]"
      >
        <div
          className="flex justify-center items-center gap-2.5 self-stretch bg-[#00000033]"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          role="button"
          tabIndex={0}
          aria-label="Upload profile photo"
        >
          <div className="flex w-60 h-60 flex-col justify-center items-center gap-4 rounded-[32px] bg-[#0E464F] overflow-hidden">
            {imagePreview ? (
              <div className="relative w-full h-full ">
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover rounded-[32px]"
                />
                {isUploading && (
                  <svg
                    className="absolute top-0 bottom-0 left-0 right-0 margin-auto z-10 w-20 h-20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                  >
                    <circle
                      fill="none"
                      stroke-opacity="1"
                      stroke="#07373F"
                      stroke-width=".5"
                      cx="100"
                      cy="100"
                      r="0"
                    >
                      <animate
                        attributeName="r"
                        calcMode="spline"
                        dur="2"
                        values="1;80"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      ></animate>
                      <animate
                        attributeName="stroke-width"
                        calcMode="spline"
                        dur="2"
                        values="0;25"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      ></animate>
                      <animate
                        attributeName="stroke-opacity"
                        calcMode="spline"
                        dur="2"
                        values="1;0"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      ></animate>
                    </circle>
                  </svg>
                )}
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M25.2639 14.816C24.6812 10.2266 20.7505 6.66663 16.0052 6.66663C12.3305 6.66663 9.13854 8.81463 7.68121 12.2C4.81721 13.056 2.67188 15.76 2.67188 18.6666C2.67188 22.3426 5.66254 25.3333 9.33854 25.3333H10.6719V22.6666H9.33854C7.13321 22.6666 5.33854 20.872 5.33854 18.6666C5.33854 16.7946 6.93721 14.9906 8.90254 14.6453L9.67721 14.5093L9.93321 13.7653C10.8705 11.0306 13.1972 9.33329 16.0052 9.33329C19.6812 9.33329 22.6719 12.324 22.6719 16V17.3333H24.0052C25.4759 17.3333 26.6719 18.5293 26.6719 20C26.6719 21.4706 25.4759 22.6666 24.0052 22.6666H21.3385V25.3333H24.0052C26.9465 25.3333 29.3385 22.9413 29.3385 20C29.337 18.8047 28.9347 17.6444 28.196 16.7046C27.4574 15.7649 26.425 15.0999 25.2639 14.816Z"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M17.3385 18.6666V13.3333H14.6719V18.6666H10.6719L16.0052 25.3333L21.3385 18.6666H17.3385Z"
                    fill="#FAFAFA"
                  />
                </svg>
                <p className="self-stretch text-grey-98 text-center p-6">
                  {isUploading
                    ? "Uploading..."
                    : "Drag & drop or click to upload"}
                </p>
              </>
            )}
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && handleImageUpload(e.target.files[0])
              }
              aria-describedby="photo-error"
            />
          </div>
        </div>
      </label>

      <div className="h-1 self-stretch bg-[#07373F]" />

      <Input
        label="Enter your name"
        name="fullName"
        value={data.fullName}
        onChange={(e) => {
          setData({ ...data, fullName: e.target.value });
          localStorage.setItem("fullName", e.target.value);
        }}
      />

      <Input
        label="Enter your email *"
        placeholder="example@example.com"
        name="email"
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
          localStorage.setItem("attendeeEmail", e.target.value);
        }}
      />

      <Textarea
        label="About the project"
        name="projectDescription"
        value={data.projectDescription}
        onChange={(e) => {
          setData({ ...data, projectDescription: e.target.value });
          localStorage.setItem("projectDescription", e.target.value);
        }}
      />
      <div className="flex flex-col md:flex-row gap-4 self-stretch md:rounded-3xl">
        <Button
          type="button"
          variant="secondary"
          className="flex-[1_0_0]"
          onClick={handlePreviousStep}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-[1_0_0]"
          disabled={
            isUploading ||
            data.fullName.length === 0 ||
            data.email.length === 0 ||
            data.projectDescription.length === 0 ||
            !imagePreview
          }
        >
          Get My Free Ticket
        </Button>
      </div>
    </form>
  );
};

export default AttendeeDetails;
