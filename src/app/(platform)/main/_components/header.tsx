"use client";
import ModalComponent from "@/app/(platform)/main/_components/modal-component";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SettingsBtn from "./settings-btn";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { createBlock } from "@/actions/create-block";
import { FormInput } from "@/app/_components/form/form-input";
import { FormSubmit } from "@/app/_components/form/form-submit";
import { useState } from "react";

interface HeaderProps {
  roleId: number;
}

const Header = ({ roleId }: HeaderProps) => {
  const params = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();
  const { execute } = useAction(createBlock, {
    onSuccess: (data) => {
      setIsOpen(false);
      toast.success("Блок создан");
      route.push(`/main/block/${data.block_id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCreateBlock = (formData: FormData) => {
    const name = formData.get("name") as string;
    execute({ name });
  };

  return (
    <div className="w-full h-[80px] border-b shadow-lg mb-6">
      <div className="px-32 w-full h-full flex items-center justify-between">
        <div className="flex gap-8 items-center font-semibold">
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
            Учебные блоки
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
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Создать блок
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <SettingsBtn />
        </div>
      </div>
      <ModalComponent
        title="Создание блока"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <form action={onCreateBlock}>
          <div className="flex flex-col gap-4 pt-2">
            <FormInput
              name="name"
              id="name"
              type="text"
              placeholder="Введите имя учебного блока"
              className="text-black, font-medium"
            />
            <FormSubmit>Создать</FormSubmit>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Header;
