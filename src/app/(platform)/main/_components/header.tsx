"use client";
import ModalComponent from "@/app/(platform)/main/_components/modal-create-block";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  roleId: number;
}

const Header = ({ roleId }: HeaderProps) => {
  const params = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full h-[80px] border-b shadow-lg mb-6">
      <div className="px-32 w-full h-full flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link href="/main">
            <Image src="/logo.svg" alt="logo" width={25} height={25} />
          </Link>
          {roleId !== 1 && (
            <Link
              href="/main/teaching"
              className={params === "/main/teaching" ? " text-blue-700" : ""}
            >
              Я преподаю
            </Link>
          )}
          {roleId === 1 && (
            <Link
              href="/main/studying"
              className={params === "/main/studying" ? " text-blue-700" : ""}
            >
              Я учу
            </Link>
          )}
          <Link
            href="/main/my-results"
            className={params === "/main/my-results" ? " text-blue-700" : ""}
          >
            Результаты
          </Link>
          {roleId !== 1 && (
            <Button variant="outline" onClick={onOpen}>
              Создать блок
            </Button>
          )}
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
          <Button
            onClick={onOpenChange}
            type="submit"
            color="primary"
            size="lg"
          >
            Создать
          </Button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Header;
