import { Button } from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-[80px] border-b shadow-lg">
      <div className="px-32 w-full h-full flex items-center justify-between  ">
        <div className="flex gap-8">
          <div>Logo</div>
          <Link href="/teaching">Я преподаю</Link>
          <Link href="/studying">Я учу</Link>
        </div>
        <Button>Настройки</Button>
      </div>
    </div>
  );
};

export default Header;
