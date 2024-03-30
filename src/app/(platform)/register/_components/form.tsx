"use client";

import { ElementRef, useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { registerUser } from "@/actions/register";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { execute } = useAction(registerUser, {
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Пользователь зарегистрирован");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error);
      setIsLoading(false);
    },
  });

  const onSubmit = (formData: FormData) => {
    const login = formData.get("login") as string;
    const email = formData.get("email") as string;
    const name = formData.get("fio") as string;
    const password = formData.get("password") as string;
    execute({ login, email, password, name });
    setIsLoading(true);
  };
  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <Input
        className="mb-4"
        name="login"
        type="text"
        label="Логин"
        placeholder="Введите логин"
      />
      <Input
        className="mb-4"
        name="fio"
        type="text"
        label="ФИО"
        placeholder="Введите ФИО"
      />
      <Input
        className="mb-4"
        name="email"
        type="email"
        label="Email"
        placeholder="Введите email"
      />
      <Input
        className="mb-4"
        name="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <Button type="submit" color="success" isLoading={isLoading}>
        <span className=" text-white font-semibold text-lg">Регистрация</span>
      </Button>
    </form>
  );
}
