import { NextPage } from "next";
import Image from "next/image";
import reg from "@/public/assets/images/reg.png";
import vip from "@/public/assets/images/vip.png";
import vvip from "@/public/assets/images/vvip.png";

const TicketCard: NextPage<{
  data: {
    fullName: string;
    email: string;
    profilePhoto: string;
    numberOfTickets: string;
  };
  ticketRef: React.RefObject<HTMLDivElement | null>;
  selectedTicket: number | null;
}> = ({ data, ticketRef, selectedTicket }) => {
  console.log(data);
  return (
    <div className="flex md:py-8 md:px-[21px] flex-col gap-2.5 self-stretch rounded-3xl">
      <div
        ref={ticketRef}
        className="w-min px-0.5 h-[102px] md:h-[200px] bg-[#D9D9D9] rounded-[9.897px] md:rounded-[19.4px] flex items-center justify-center overflow-hidden"
      >
        <div className="w-[231.4px] h-[99.6px] md:w-[467.6px] md:h-[195px] shrink-0 flex flex-col justify-between relative overflow-hidden rounded-[8.659px_2.474px_2.474px_8.659px] md:rounded-[16.957px_4.845px_4.845px_16.957px] bg-[#0E464F]">
          <div className="flex gap-2 md:gap-6 shrink-0 self-stretch p-1 md:pt-2 md:pl-3 relative">
            <div
              className="w-[78.5px] h-[76.3px] md:w-[146px] md:h-[142px] shrink-0 aspect-[78.55/76.35] md:aspect-[145.80/141.71] overflow-hidden rounded-[3.7px] md:rounded-[6.813px] border-[1.46px] md:border-[2.725px] border-[#0E464F]"
              style={{
                boxShadow: "0px 10.901px 5.45px 0px rgba(32, 31, 31, 0.25)",
              }}
            >
              <Image
                src={data.profilePhoto}
                alt={"Profile preview"}
                width={240}
                height={240}
                className="w-full h-full object-cover aspect-[78.55/76.35] md:aspect-[145.80/141.71]"
              />
            </div>

            <div className="inline-flex flex-col gap-1.5">
              <h2 className="w-[124px] md:w-[221.7px] text-grey-98 text-[19.8px] md:text-[67.828px] leading-[81%] font-roadRage">
                Techember Fest ”25
              </h2>

              <div className="inline-flex flex-col gap-[2.5px]">
                <p className="text-grey-98 text-[8.6px] leading-[150%] md:text-base">
                  📍 04 Rumens road, Ikoyi, Lagos
                </p>
                <p className="text-grey-98 text-[8.6px] leading-[150%] md:text-base">
                  📅 March 15, 2025 | 7:00 PM
                </p>
              </div>
            </div>

            <h4 className="w-[60px] text-grey-98 font-roadRage text-[21.8px] opacity-20 absolute -bottom-3 right-2 md:hidden">
              Techember Fest ”25
            </h4>
          </div>
          <div className="flex md:w-[468px] md:h-4 md:py-2.5 md:px-6 md:items-center md:gap-2.5 shrink-0 md:opacity-30 md:bg-white">
            <p className="text-[#FAFAFA] md:text-[#0E464F] text-[7.4px] font-light md:text-sm md:font-black pl-5 md:pl-0">
              Ticket for{" "}
              {Number(data.numberOfTickets) === 1
                ? data.numberOfTickets + " entry only"
                : Number(data.numberOfTickets) > 1
                ? data.numberOfTickets + " entries only"
                : "No ticket selected"}
            </p>
          </div>

          <Image
            src={
              Number(selectedTicket) === 1
                ? reg
                : Number(selectedTicket) === 2
                ? vip
                : Number(selectedTicket) === 3
                ? vvip
                : reg
            }
            alt={"Ticket"}
            width={66.616}
            height={56.927}
            className="absolute right-0 w-[34.8px] h-[28.5px] md:w-[66.6px] md:h-[56.9px]"
          />
        </div>

        <div className="flex w-[7.267px] flex-col justify-center items-center gap-[2.422px]">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index + 1}
              className="h-[2.422px] self-stretch rounded-[9.69px] bg-[#041E23]"
            />
          ))}
        </div>

        <div className="w-[47.1px] h-[99.5px] md:w-[77.5px] md:h-[195px] shrink-0 relative rounded-[2.474px_8.659px_8.659px_2.474px] md:rounded-[4.845px_16.957px_16.957px_4.845p] bg-[#0E464F]">
          <div className="flex flex-col items-end w-max -rotate-90 gap-[1.2px] md:gap-[2.8px] absolute -left-1 top-6 md:-left-8 md:top-[55px]">
            <h3 className="text-grey-98 font-roadRage text-[10.9px] md:text-[24.42px] leading-[81%] self-stretch shrink-0">
              Techember Fest ”25
            </h3>

            <p className="self-stretch shrink-0 text-[11.535px] leading-[150%] text-grey-98 font-semibold hidden md:block">
              User Name: <span className="font-normal">{data.fullName}</span>
            </p>
            <div className="flex flex-col gap-[0.69px] md:hidden">
              <p className="text-[5px] leading-[150%] text-grey-98">
                4 Rumens road, Ikoyi, Lagos
              </p>
              <p className="text-[5px] leading-[150%] text-grey-98">
                March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>
          <div className="flex w-[4.9px] md:w-[9.69px] justify-end gap-[1.2px] md:gap-[2.422px] absolute right-1 top-1.5 md:right-4 md:top-[15px] z-[1]">
            <div className="w-[1.2px] md:w-[4.22px] h-16 md:h-[127.177px] shrink-0 rounded-[61px] md:rounded-[120px] bg-[#56C8DD] md:bg-[#052930]" />
            <div className="w-[1.2px] md:w-[4.22px] h-[88.4px] md:h-[173.203px] shrink-0 rounded-[61px] md:rounded-[120px] bg-[#56C8DD] md:bg-[#052930]" />
          </div>

          <div className="absolute bottom-0 right-2 md:right-1 -rotate-[180deg]">
            <h3 className="text-grey-98 font-roadRage text-[29.69px] leading-[130%] md:hidden">
              {Number(selectedTicket) === 1
                ? "REG"
                : Number(selectedTicket) === 2
                ? "VIP"
                : Number(selectedTicket) === 3
                ? "VVIP"
                : "REG"}
            </h3>
            <Image
              src={
                Number(selectedTicket) === 1
                  ? reg
                  : Number(selectedTicket) === 2
                  ? vip
                  : Number(selectedTicket) === 3
                  ? vvip
                  : reg
              }
              alt={"Ticket"}
              width={66.616}
              height={56.927}
              className="hidden md:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
