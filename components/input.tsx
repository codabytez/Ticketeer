import { NextPage } from "next";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Input: NextPage<InputProps> = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col gap-2 self-stretch">
      {label && (
        <label htmlFor={name} id={name} className="self-stretch text-grey-98">
          {label}
        </label>
      )}
      <input
        className="flex p-3 items-center gap-2 self-stretch rounded-xl bg-transparent border border-[#07373F] focus:outline-none focus:border-border text-white font-roboto custom-select"
        {...props}
      />
    </div>
  );
};

export const Select: NextPage<SelectProps> = ({
  placeholder,
  options,
  label,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 self-stretch">
      {label && (
        <label htmlFor={name} id={name} className="self-stretch text-grey-98">
          {label}
        </label>
      )}
      <select
        className="flex p-3 items-center gap-2 self-stretch rounded-xl bg-transparent border border-[#07373F] focus:outline-none focus:border-border text-white font-roboto custom-select"
        {...props}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <style jsx>{`
        select option {
          background-color: #08252b;
          color: #fff;
        }

        .custom-select::-webkit-scrollbar {
          width: 4px;
        }

        .custom-select::-webkit-scrollbar-track {
          background: #041e23;
        }

        .custom-select::-webkit-scrollbar-thumb {
          background: #0e464f;
          border-radius: 2px;
        }

        .custom-select::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export const Textarea: NextPage<TextareaProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 self-stretch">
      {label && (
        <label htmlFor={name} id={name} className="self-stretch text-grey-98">
          {label}
        </label>
      )}
      <textarea
        className="flex h-32 resize-none p-3 items-center gap-2 self-stretch rounded-xl bg-transparent border border-[#07373F] focus:outline-none focus:border-border text-white font-roboto custom-select"
        {...props}
      />
    </div>
  );
};
