"use client";

import { ElementRef, FormEvent, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/app/_components/form/form-input";
import { FormSubmit } from "@/app/_components/form/form-submit";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function Form() {
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);
  const { pending } = useFormStatus();

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
    } else {
      toast.error("Ошибка входа");
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <FormInput
        disabled={pending}
        id="login"
        className="h-10"
        name="login"
        type="text"
        label="Логин"
        placeholder="Введите логин"
      />
      <FormInput
        disabled={pending}
        id="password"
        className="h-10"
        name="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <FormSubmit disabled={pending}>
        <span className="font-semibold text-lg">Войти</span>
      </FormSubmit>
    </form>
  );
}
