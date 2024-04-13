"use client";
import ModalComponent from "@/app/_components/modal-form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full h-[80px] border-b shadow-lg mb-6">
      <div className="px-32 w-full h-full flex items-center justify-between  ">
        <div className="flex gap-8 items-center">
          <div>Logo</div>
          <Link href="/teaching">Я преподаю</Link>
          <Link href="/studying">Я учу</Link>
          <Button
            type="button"
            variant="ghost"
            color="primary"
            onClick={onOpen}
          >
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
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Введите имя учебного блока"
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
