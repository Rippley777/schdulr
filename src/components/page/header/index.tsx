import reactLogo from "../../../assets/react.svg";
import { PageConfig } from "../../../types";
import siteConfigJson from "../../../site.config.json";

type HeaderProps = {
  fixed?: boolean;
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="w-full min-h-20 dark:bg-black flex justify-between items-center px-5">
      <div className="text-3xl font-bold">
        {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        RIP Repair
      </div>
      <div className="flex">
        {siteConfigJson.pages.map((page: PageConfig) => (
          <HeaderLink href={page.path}>{page.title}</HeaderLink>
        ))}
      </div>
    </div>
  );
};

export default Header;

type HeaderLinkProps = { href: string; children: React.ReactNode };

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, children }) => {
  return (
    <div className="header-nav mx-5">
      <a className="font-700 text-white" href={href}>
        {children}
      </a>
    </div>
  );
};
