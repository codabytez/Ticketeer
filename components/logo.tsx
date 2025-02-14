import { NextPage } from "next";
import Image from "next/image";
import ticket from "@/public/assets/icons/ticket.svg";
import ticz from "@/public/assets/icons/ticz.svg";
import Link from "next/link";

const Logo: NextPage = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex py-1.5 px-2 justify-center items-center gap-2.5 rounded-xl border border-[#0E464F] bg-[#052F35]">
        <Image src={ticket} alt="ticket" />
      </div>
      <Image src={ticz} alt="ticz" />
    </Link>
  );
};

export default Logo;
