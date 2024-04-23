"use client";
import ModalComponent from "@/app/_components/modal-form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const params = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full h-[80px] border-b shadow-lg mb-6">
      <div className="px-32 w-full h-full flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link href="/main">
            <Image src="/logo.svg" alt="logo" width={25} height={25} />
          </Link>
          <Link
            href="/main/teaching"
            className={params === "/main/teaching" ? " text-blue-700" : ""}
          >
            Я преподаю
          </Link>
          <Link
            href="/main/studying"
            className={params === "/main/studying" ? " text-blue-700" : ""}
          >
            Я учу
          </Link>
          <Button variant="outline" onClick={onOpen}>
            Создать блок
          </Button>
        </div>
        <Button>Настройки</Button>
      </div>
      <ModalComponent
        title="Создание блока"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div className="flex flex-col gap-4 pt-2">
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Введите имя учебного блока"
            autoComplete="off"
            style={{ color: "black", fontWeight: 500 }}
          />
          <Button type="submit" color="primary" size="lg">
            Создать
          </Button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Header;
