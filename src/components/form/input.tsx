import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
  test?: string;
}

type FormInputProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type FormInputGridProps = {
  field: React.ReactNode;
  label: React.ReactNode;
};

export const Input = React.forwardRef((props: InputProps) => {
  return (
    <input
      className="dark:bg-zinc-800 p-3 border-1 border-gray-700 border-solid rounded-md outline-none w-full"
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

export const FormInputInline = ({
  children,
  label,
  className,
}: FormInputProps) => (
  <div className={`text-sm text-gray-400 ${className}`}>
    {label}
    {children}
  </div>
);

export const FormInputGrid = ({ label, field }: FormInputGridProps) => (
  <FormInputInline
    className="grid md:grid-cols-4 grid-cols-1 items-center gap-x-2 gap-y-1 text-lg"
    label={
      <label className="md:text-right text-left font-medium ml-2">
        {label}
      </label>
    }
  >
    <div className="md:col-span-3 rounded p-2 w-full">{field}</div>
  </FormInputInline>
);

export const FormInputCheckboxGrid = ({
  label,
  ...props
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
};

export const FormInputTwoCheckboxGrid = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};
export default FormInput;
