import { Button, Link } from "@nextui-org/react";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col pt-32">
      <div className=" bg-amber-100 p-3 rounded-md font-bold text-sm text-orange-800 mb-4 ">
        Лучшая платформа для изучения английского языка
      </div>
      <div className=" font-bold text-3xl mb-4 sm:text-4xl text-center ">
        Englanger помогает изучать и совершенствовать
      </div>
      <div className=" text-white p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-3xl sm:text-4xl rounded-lg mb-4">
        твой английский.
      </div>
      <div className=" w-3/4 sm:w-2/4  text-center mb-4 text-gray-500 text-sm">
        Бла бла бла
      </div>
      <Button
        variant="ghost"
        radius="sm"
        href="/login"
        color="default"
        as={Link}
      >
        <span className="font-semibold">Попробовать</span>
      </Button>
    </div>
  );
};

export default MarketingPage;
