"use client";
import { createBlock } from "@/actions/create-block";
import { useAction } from "@/hooks/use-action";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ModalComponent({
  children,
  isOpen,
  onOpenChange,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
}) {
  const route = useRouter();
  const { execute } = useAction(createBlock, {
    onSuccess: (data) => {
      toast.success("Блок создан");
      route.push(`/block/${data.block_id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    console.log(name);

    execute({ name });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-black">
          {title}
        </ModalHeader>
        <ModalBody>
          <form action={onSubmit}>{children}</form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
