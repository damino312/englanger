"use client";
import ModalComponent from "@/app/(platform)/main/_components/modal-create-block";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";
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
          <Link
            href={cn(
              roleId === 1 && "/main/studying",
              roleId === 2 && "/main/teaching"
            )}
            className={cn(
              params === "/main/teaching" || params === "/main/studying"
                ? " text-blue-700"
                : ""
            )}
          >
            {roleId === 1 && "Прохождение блоков"}
            {roleId === 2 && "Созданные блоки"}
          </Link>

          <Link
            href={cn(
              roleId === 1 && "/main/my-results",
              roleId === 2 && "/main/results"
            )}
            className={cn(
              params === "/main/my-results" || params === "/main/results"
                ? " text-blue-700"
                : ""
            )}
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
