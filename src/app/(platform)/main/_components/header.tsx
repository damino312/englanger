"use client";
import ModalComponent from "@/app/_components/modal-form";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full h-[80px] border-b shadow-lg">
      <div className="px-32 w-full h-full flex items-center justify-between  ">
        <div className="flex gap-8 items-center">
          <div>Logo</div>
          <Link href="/teaching">Я преподаю</Link>
          <Link href="/studying">Я учу</Link>
          <Button
            type="button"
            onPress={onOpen}
            color="success"
            variant="ghost"
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
        <Input
          name="name"
          id="name"
          type="text"
          label="Имя блока"
          placeholder="Введите имя учебного блока"
        />
        <Button type="submit" color="primary">
          Создать
        </Button>
      </ModalComponent>
    </div>
  );
};

export default Header;
