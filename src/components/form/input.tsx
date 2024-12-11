import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
  test?: string;
}

type FormInputProps = {
  label: string;
  children: React.ReactNode;
};

export const Input = React.forwardRef((props: InputProps, ref: any) => {
  return (
    <input
      className="dark:bg-gray-600 p-2 border-1 border-gray-700 border-solid rounded-sm outline-none"
      {...props}
    />
  );
});

export const FormInput = ({ children, label }: FormInputProps) => (
  <div>
    <div className="text-sm text-gray-400">
      <label>{label}</label>
    </div>
    {children}
  </div>
);

export default FormInput;
