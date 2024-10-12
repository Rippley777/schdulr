import { ClassNameValue, twMerge } from "tailwind-merge";

import Footer from "./footer";
import Header from "./header";

type PageProps = {
  children: React.ReactNode;
  bodyStyles?: ClassNameValue;
  fixedFooter?: boolean;
  fixedHeader?: boolean;
};

const Page: React.FC<PageProps> = ({
  children,
  bodyStyles = "",
  fixedFooter = false,
  fixedHeader = true,
}) => {
  return (
    <div className="flex flex-col h-full">
      <Header fixed={fixedHeader} />
      <div
        className={twMerge(
          `flex-1`,
          bodyStyles,
          fixedFooter ? "overflow-scroll" : ""
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
