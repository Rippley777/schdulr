import { twMerge } from "tailwind-merge";

import Footer from "./footer";
import Header from "./header";

type PageProps = {
  children: React.ReactNode;
  fixedFooter?: boolean;
  fixedHeader?: boolean;
};

const Page: React.FC<PageProps> = ({
  children,
  fixedFooter = false,
  fixedHeader = true,
}) => {
  return (
    <div className="flex flex-col h-full">
      <Header fixed={fixedHeader} />
      <div className={twMerge(`flex-1`, fixedFooter ? "overflow-scroll" : "")}>
        {children}
      </div>
      <Footer fixed={fixedFooter} />
    </div>
  );
};

export default Page;
