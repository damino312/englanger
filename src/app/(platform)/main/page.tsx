import { LastBlocks } from "./_components/last-blocks";
const MainPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full px-32 ">
        <h2 className="text-3xl font-semibold mb-4">
          Что последнее я проходил:
        </h2>
        <LastBlocks />
        <h2 className="text-3xl font-semibold my-4">
          Что последнее я создавал:
        </h2>
        <LastBlocks />
      </div>
    </div>
  );
};

export default MainPage;
