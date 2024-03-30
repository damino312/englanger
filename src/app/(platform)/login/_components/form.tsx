"use client";

import { ElementRef, FormEvent, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      login: formData.get("login"),
      password: formData.get("password"),
      redirect: false,
    });
    if (!response?.error) {
      router.push("/");
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
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
        name="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <Button type="submit" color="success">
        <span className=" text-white font-semibold text-lg">Войти</span>
      </Button>
    </form>
  );
}
