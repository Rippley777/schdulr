import Page from "../../components/page";

const HomePage: React.FC = () => {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Welcome to the home page</h1>
        <p className="text-lg">This is the home page content</p>
        <InfoBlocks />
      </div>
    </Page>
  );
};

export default HomePage;

const InfoBlocks: React.FC = () => {
  return (
    <div className="flex gap-3">
      <InfoBlock />
      <InfoBlock />
    </div>
  );
};

const InfoBlock: React.FC = () => {
  return <div className="flex flex-col"></div>;
};
