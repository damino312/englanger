import Logo from "@/app/_components/icon";
import { Button, Link } from "@nextui-org/react";

const Header = () => (
  <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center justify-center">
    <div className="flex justify-between md:max-w-screen-2xl w-full">
      <div className="flex gap-x-3 items-center">
        <Logo />
        <span className="font-bold text-lg">Englanger</span>
      </div>
      <div>
        <Button variant="ghost" radius="sm" href="/login" as={Link}>
          <span className="font-semibold">Логин</span>
        </Button>
      </div>
    </div>
  </div>
);

export default Header;
