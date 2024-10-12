import Header from "./header";

type PageProps = {
  children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Page;
